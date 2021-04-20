import { className } from 'lib/className'
import './Card.scss'

export const Card = props => {
  const classNames = className([props.className, 'app-card'])

  return (
    <div {...props} className={classNames}>
      {props.children}
    </div>
  )
}
