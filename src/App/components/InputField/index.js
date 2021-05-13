import { Input } from 'App/components/Input'
import { Error } from 'App/components/Error'
import { className } from 'lib/className'
import './InputField.scss'

export const InputField = ({ touched, valid, errors, ...props }) => {
  const isInputFieldInvalid = !valid && touched

  const classNames = className([
    props.className,
    isInputFieldInvalid ? 'app-input--invalid' : null,
  ])

  const errorMessages = errors.map((error, key) => <Error key={key}>{error}</Error>)

  return (
    <div className='app-field'>
      <Input {...props} className={classNames} />
      {isInputFieldInvalid ? errorMessages : null}
    </div>
  )
}
