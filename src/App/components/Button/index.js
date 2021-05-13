import { className } from 'lib/className'
import './Button.scss'

export const Button = props => {
  const getButtonStyle = () => {
    switch (props.variant) {
      case 'primary':
        return 'app-button--primary'
      case 'success':
        return 'app-button--success'
      case 'warning':
        return 'app-button--warning'
      case 'danger':
        return 'app-button--danger'
      case 'icon':
        return 'app-button--icon'
      default:
        return null
    }
  }

  const classNames = className([props.className, 'app-button', getButtonStyle()])

  return (
    <button {...props} className={classNames} type='submit'>
      {props.children}
    </button>
  )
}
