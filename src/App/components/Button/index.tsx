import { className } from 'lib/className'
import './Button.scss'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'primary' | 'success' | 'warning' | 'danger' | 'icon'
}

export const Button: React.FC<Props> = props => {
  const getButtonStyle = (): string => {
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
    }
  }

  const classNames = className([props.className, 'app-button', getButtonStyle()])

  return <button {...props} className={classNames} type='submit' />
}
