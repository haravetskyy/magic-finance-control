import { Error } from 'App/components/Error'
import { Input } from 'App/components/Input'
import { FieldProps } from 'App/hooks/useForm'
import { className } from 'lib/className'
import { ChangeEventHandler } from 'react'
import './InputField.scss'

type Props = React.InputHTMLAttributes<HTMLInputElement> & FieldProps<string>

export const InputField: React.FC<Props> = props => {
  const { errors, handleBlur, handleChange, touched, value, ...inputProps } = props

  const classNames = className([
    props.className,
    errors !== undefined && touched ? 'app-input--invalid' : null,
  ])

  const onChange: ChangeEventHandler<HTMLInputElement> = event => {
    handleChange(event.currentTarget.value)
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
