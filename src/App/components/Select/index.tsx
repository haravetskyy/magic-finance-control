import { className as cn } from 'lib/className'
import { prepend } from 'lib/Data/Array'
import React from 'react'
import './Select.scss'
import { Error } from 'App/components/Error'
import { FieldProps } from 'App/hooks/useForm'
import { className } from 'lib/className'
import { ChangeEventHandler, ComponentProps } from 'react'

type SelectProps<T extends string> = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: Array<{
    label: string
    value: T
  }>
  hiddenLabel: string
}

export function Select<T extends string>({
  options,
  hiddenLabel,
  className,
  ...props
}: SelectProps<T>) {
  const placeholder = (
    <option hidden key='hidden-label'>
      {hiddenLabel}
    </option>
  )

  const classNames = cn([className, 'app-select'])

  const children = options.map(({ label, value }, key) => (
    <option value={value} key={key}>
      {label}
    </option>
  ))

  return (
    <select className={classNames} {...props}>
      {prepend(children, placeholder)}
    </select>
  )
}

type SelectFieldProps<T extends string> = ComponentProps<typeof Select> & FieldProps<T>

export function SelectField<T extends string>(props: SelectFieldProps<T>) {
  const { errors, handleBlur, handleChange, touched, value, ...selectProps } = props

  const classNames = className([
    props.className,
    errors !== undefined && touched ? 'app-select--invalid' : null,
  ])

  const onChange: ChangeEventHandler<HTMLSelectElement> = event => {
    handleChange(event.currentTarget.value as T)
  }

  return (
    <div className='app-field'>
      <Select
        {...selectProps}
        className={classNames}
        onBlur={handleBlur}
        onChange={onChange}
        value={value}
      />
      {props.errors && props.errors.map((error, key) => <Error key={key}>{error.message}</Error>)}
    </div>
  )
}
