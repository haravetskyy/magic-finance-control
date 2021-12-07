import { Error } from 'App/components/Error'
import { FieldProps } from 'App/hooks/useForm'
import { className } from 'lib/className'
import { ChangeEventHandler } from 'react'
import './Input.scss'
import { CommonInputProps } from './types'

type DateInputProps = CommonInputProps<Date>

export function DateInput(props: DateInputProps) {
  const classNames = className([props.className, 'app-input'])

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (e.currentTarget.valueAsDate !== null) {
      props.onChange(e.currentTarget.valueAsDate)
    }
  }

  return (
    <input
      className={classNames}
      onBlur={props.onBlur}
      onChange={handleChange}
      type='date'
      value={props.value.toISOString().slice(0, 10)}
    />
  )
}

type DateFieldProps = DateInputProps & FieldProps<Date>

export function DateField(props: DateFieldProps) {
  const classNames = className([
    props.className,
    props.errors !== undefined && props.touched ? 'app-input--invalid' : null,
  ])

  return (
    <div className='app-field'>
      <DateInput className={classNames} {...props} />
      {props.errors && props.errors.map((error, key) => <Error key={key}>{error.message}</Error>)}
    </div>
  )
}
