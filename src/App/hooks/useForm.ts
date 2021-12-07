import { NonEmptyArray } from 'lib/Data/Array'
import { pipe } from 'lib/Data/pipe'
import { UnknownRecord } from 'lib/Data/Record'
import {
  isFailure,
  isSuccess,
  validate,
  ValidatedValues,
  ValidationError,
  ValidationSchema,
  Validator,
} from 'lib/Form'
import { Reducer, SyntheticEvent, useMemo, useReducer } from 'react'

type UseFormOptions<Input extends UnknownRecord, Schema extends ValidationSchema<Input>> = {
  initialValues: Input
  validationStrategy: 'onChange' | 'onBlur'
  validators: (values: Input) => Schema
  onSubmit: (data: ValidatedValues<Input, Schema>) => unknown
}

type FieldState<T> = {
  errors?: NonEmptyArray<ValidationError>
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

function toValues<T extends UnknownRecord>(formState: FormState<T>): T {
  const result = {} as T

  for (const key in formState) {
    result[key] = formState[key].value
  }

  return result
}

export function useForm<Input extends UnknownRecord, Schema extends ValidationSchema<Input>>(
  options: UseFormOptions<Input, Schema>,
) {
  const { initialValues, onSubmit, validators, validationStrategy } = options

  type Action =
    | { id: 'Blur'; key: keyof Input }
    | { id: 'Change'; key: keyof Input; value: Input[keyof Input] }
    | { id: 'Validate'; key: keyof Input }
    | { id: 'Reset' }

  const reducer: Reducer<FormState<Input>, Action> = (state, action) => {
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
        const validator = validators(formValues)[action.key] as
          | Validator<Input[typeof action.key], ValidatedValues<Input, Schema>[typeof action.key]>
          | undefined

        if (validator) {
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

      case 'Reset':
        return initialState
    }
  }

  const initialState = useMemo(() => initializeForm(initialValues), [])

  const [formState, dispatch] = useReducer(reducer, initialState)

  const values = useMemo(() => toValues(formState), [formState])

  const fieldProps = <K extends keyof Input>(key: K): FieldProps<Input[K]> => ({
    ...formState[key],
    onChange: (value: Input[K]) => {
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

  const handleReset = (): void => dispatch({ id: 'Reset' })

  return {
    fieldProps,
    handleReset,
    handleSubmit,
    values,
  }
}
