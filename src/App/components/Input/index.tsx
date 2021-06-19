import { className } from 'lib/className'
import './Input.scss'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<Props> = props => {
  const classNames = className([props.className, 'app-input'])

  return <input {...props} className={classNames} />
}
