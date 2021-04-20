import { className } from 'lib/className'
import './Input.scss'

export const Input = props => {
  const classNames = className([props.className, 'app-input'])

  return <input {...props} className={classNames} />
}
