import { Input } from 'App/components/Input'
import { className } from 'lib/className'
import './Field.scss'

export const Field = ({ touched, valid, errors, ...props }) => {
  const isFieldInvalid = !valid && touched

  const classNames = className([
    props.className,
    'app-field__input',
    isFieldInvalid ? 'app-field__input--invalid' : null,
  ])

  const errorMessages = errors.map((error, key) => (
    <span key={key} className='app-field__error'>
      {error}
    </span>
  ))

  return (
    <div className='app-field'>
      <Input {...props} className={classNames} />
      {isFieldInvalid ? errorMessages : null}
    </div>
  )
}
