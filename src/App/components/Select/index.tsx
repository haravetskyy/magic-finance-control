import { Error } from 'App/components/Error'
import { CommonProps } from 'App/components/types'
import { FieldProps } from 'App/hooks/useForm'
import { className, className as cn } from 'lib/className'
import { prepend } from 'lib/Data/Array'
import { ChangeEventHandler } from 'react'
import './Select.scss'

export type SelectOptions<T extends string> = Array<{ label: string; value: T }>

type SelectProps<T extends string> = CommonProps & {
  hiddenLabel: string
  onBlur: () => void
  onChange: (value: T) => void
  options: SelectOptions<T>
  value: T
}

export function Select<T extends string>(props: SelectProps<T>) {
  const { hiddenLabel, ...selectProps } = props

  const placeholder = (
    <option hidden key='hidden-label'>
      {hiddenLabel}
    </option>
  )

  const classNames = cn([props.className, 'app-select'])

  const children = props.options.map(({ label, value }, key) => (
    <option value={value} key={key} children={label} />
  ))

  const handleChange: ChangeEventHandler<HTMLSelectElement> = event => {
    selectProps.onChange(event.currentTarget.value as T)
  }

  return (
    <select
      {...selectProps}
      className={classNames}
      onChange={handleChange}
      value={selectProps.value || undefined}>
      {prepend(children, placeholder)}
    </select>
  )
}

type SelectFieldProps<T extends string> = SelectProps<T> & FieldProps<T>

export function SelectField<T extends string>(props: SelectFieldProps<T>) {
  const { errors, touched, ...selectProps } = props

  const classNames = className([
    props.className,
    errors !== undefined && touched ? 'app-select--invalid' : null,
  ])

  return (
    <div className='app-field'>
      <Select<T> {...selectProps} className={classNames} />
      {errors && errors.map((error, key) => <Error key={key}>{error.message}</Error>)}
    </div>
  )
}
