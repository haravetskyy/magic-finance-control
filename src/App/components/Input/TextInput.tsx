import { Error } from 'App/components/Error'
import { FieldProps } from 'App/hooks/useForm'
import { className } from 'lib/className'
import { ChangeEventHandler } from 'react'
import './Input.scss'
import { CommonInputProps } from './types'

type TextInputProps = CommonInputProps<string> & { type?: 'text' | 'email' | 'password' }

export function TextInput(props: TextInputProps) {
  const classNames = className([props.className, 'app-input'])

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    props.onChange(e.currentTarget.value)
  }

  return (
    <input
      className={classNames}
      id={props.id}
      onBlur={props.onBlur}
      onChange={handleChange}
      placeholder={props.placeholder}
      type={props.type || 'text'}
      value={props.value}
    />
  )
}

type TextFieldProps = TextInputProps & FieldProps<string>

export function TextField(props: TextFieldProps) {
  const classNames = className([
    props.className,
    props.errors !== undefined && props.touched ? 'app-input--invalid' : null,
  ])

  return (
    <div className='app-field'>
      <TextInput className={classNames} {...props} />
      {props.errors && props.errors.map((error, key) => <Error key={key}>{error.message}</Error>)}
    </div>
  )
}
