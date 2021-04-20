import { Input } from 'App/components/Input'
import { className } from 'lib/className'
import './Field.scss'

export const Field = ({ touched, valid, ...props }) => {
  const isFieldInvalid = !valid && touched

  const classNames = className([
    props.className,
    'app-field__input',
    isFieldInvalid ? 'app-field__input--invalid' : null,
  ])

  return (
    <div className='app-field'>
      <Input {...props} className={classNames} />
      {isFieldInvalid ? <span className='app-field__error'>{props.error}</span> : null}
    </div>
  )
}
