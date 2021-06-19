import { className } from 'lib/className'
import './Card.scss'

type Props = React.HTMLAttributes<HTMLDivElement>

export const Card: React.FC<Props> = props => {
  const classNames = className([props.className, 'app-card'])

  return <div {...props} className={classNames} />
}
