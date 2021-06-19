import { Error } from 'App/components/Error'
import { Input } from 'App/components/Input'
import { FieldProps } from 'App/components/types'
import { className } from 'lib/className'
import './InputField.scss'

type Props = React.InputHTMLAttributes<HTMLInputElement> & FieldProps

export const InputField: React.FC<Props> = ({ touched, valid, errors, ...props }) => {
  const isInputFieldInvalid = !valid && touched

  const classNames = className([props.className, isInputFieldInvalid ? 'app-input--invalid' : null])

  const errorMessages = errors.map((error, key) => <Error key={key}>{error}</Error>)

  return (
    <div className='app-field'>
      <Input {...props} className={classNames} />
      {isInputFieldInvalid ? errorMessages : null}
    </div>
  )
}
