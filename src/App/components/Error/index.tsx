import './Error.scss'

type Props = React.HTMLAttributes<HTMLSpanElement>

export const Error: React.FC<Props> = props => <span {...props} className='app-error' />
