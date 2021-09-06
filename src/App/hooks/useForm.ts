import { NonEmptyArray } from 'lib/Data/Array'
import { pipe } from 'lib/Data/pipe'
import { UnknownRecord } from 'lib/Data/Record'
import { isFailure, isSuccess, validate, ValidationError, ValidationSchema } from 'lib/Form'
import { Reducer, SyntheticEvent, useReducer } from 'react'

type UseFormOptions<T extends UnknownRecord> = {
  initialValues: T
  onSubmit: (data: T) => unknown
  validationStrategy: 'onChange' | 'onBlur'
  validators: (values: T) => Partial<ValidationSchema<T>>
}

type FieldState<T> = {
  errors: NonEmptyArray<ValidationError> | undefined
  touched: boolean
  value: T
}

export type FieldProps<T> = FieldState<T> & {
  onBlur: () => void
  onChange: (value: T) => void
}

type FormState<T extends UnknownRecord> = {
  [K in keyof T]: FieldState<T[K]>
}

function initializeForm<T extends UnknownRecord>(data: T): FormState<T> {
  const result = {} as FormState<T>

  for (const key in data) {
    result[key] = { errors: undefined, touched: false, value: data[key] }
  }

  return result
}

function toValues<T extends Record<string, unknown>>(formState: FormState<T>): T {
  const result = {} as T

  for (const key in formState) {
    result[key] = formState[key].value
  }

  return result
}

export function useForm<T extends UnknownRecord>(options: UseFormOptions<T>) {
  const { initialValues, onSubmit, validators, validationStrategy } = options

  const initialState = initializeForm(initialValues)

  type Action =
    | { id: 'Blur'; key: keyof T }
    | { id: 'Change'; key: keyof T; value: T[keyof T] }
    | { id: 'Validate'; key: keyof T }

  const reducer: Reducer<FormState<T>, Action> = (state, action) => {
    switch (action.id) {
      case 'Blur':
        return {
          ...state,
          [action.key]: {
            ...state[action.key],
            touched: true,
          },
        }

      case 'Change':
        return {
          ...state,
          [action.key]: {
            ...state[action.key],
            value: action.value,
          },
        }

      case 'Validate':
        const formValues = toValues(state)
        const validator = validators(formValues)[action.key]

        if (validator !== undefined) {
          const result = validator(formValues[action.key])

          return {
            ...state,
            [action.key]: {
              ...state[action.key],
              errors: isFailure(result) ? result.data : undefined,
            },
          }
        }

        return state
    }
  }

  const [formState, dispatch] = useReducer(reducer, initialState)

  const fieldProps = <K extends keyof T>(key: K): FieldProps<T[K]> => ({
    onChange: (value: T[K]) => {
      dispatch({ id: 'Change', key, value })

      if (validationStrategy === 'onChange') {
        dispatch({ id: 'Validate', key })
      }
    },
    onBlur: () => {
      dispatch({ id: 'Blur', key })

      if (validationStrategy === 'onBlur') {
        dispatch({ id: 'Validate', key })
      }
    },
    ...formState[key],
  })

  const handleSubmit = (event: SyntheticEvent): void => {
    const values = toValues(formState)
    const result = pipe(values, validate(validators))

    for (const key in values) {
      fieldProps(key).onChange(values[key])
      fieldProps(key).onBlur()
    }

    if (isSuccess(result)) {
      onSubmit(result.data)
    }

    event.preventDefault()
  }

  return {
    handleSubmit,
    fieldProps,
  }
}
