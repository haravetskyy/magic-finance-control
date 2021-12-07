import { Error } from 'App/components/Error'
import { FieldProps } from 'App/hooks/useForm'
import { className } from 'lib/className'
import { ChangeEventHandler } from 'react'
import './Input.scss'
import { CommonInputProps } from './types'

type NumberInputProps = CommonInputProps<number>

export function NumberInput(props: NumberInputProps) {
  const classNames = className([props.className, 'app-input'])

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    props.onChange(isNaN(e.currentTarget.valueAsNumber) ? 0 : e.currentTarget.valueAsNumber)
  }

  return (
    <input
      className={classNames}
      id={props.id}
      onBlur={props.onBlur}
      onChange={handleChange}
      type='number'
      value={props.value}
    />
  )
}

type NumberFieldProps = NumberInputProps & FieldProps<number>

export function NumberField(props: NumberFieldProps) {
  const classNames = className([
    props.className,
    props.errors !== undefined && props.touched ? 'app-input--invalid' : null,
  ])

  return (
    <div className='app-field'>
      <NumberInput className={classNames} {...props} />
      {props.errors && props.errors.map((error, key) => <Error key={key}>{error.message}</Error>)}
    </div>
  )
}
