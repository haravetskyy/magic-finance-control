import { className } from 'lib/className'
import './Input.scss'
import { Error } from 'App/components/Error'
import { FieldProps } from 'App/hooks/useForm'
import { ChangeEventHandler } from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<InputProps> = props => {
  const classNames = className([props.className, 'app-input'])

  return <input {...props} className={classNames} />
}

type InputFieldProps<T> = React.InputHTMLAttributes<HTMLInputElement> & FieldProps<T>

export function InputField<T>(props: InputFieldProps<T>) {
  const { errors, handleBlur, handleChange, touched, value, ...inputProps } = props

  const classNames = className([
    props.className,
    errors !== undefined && touched ? 'app-input--invalid' : null,
  ])

  const onChange: ChangeEventHandler<HTMLInputElement> = event => {
    handleChange(event.currentTarget.value as any)
  }

  return (
    <div className='app-field'>
      <Input
        {...inputProps}
        className={classNames}
        onBlur={handleBlur}
        onChange={onChange}
        value={value}
      />
      {props.errors && props.errors.map((error, key) => <Error key={key}>{error.message}</Error>)}
    </div>
  )
}
