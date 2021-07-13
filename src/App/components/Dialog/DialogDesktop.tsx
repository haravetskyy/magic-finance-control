import { Button } from 'App/components/Button'
import './Dialog.scss'

type Props = {
  children: JSX.Element
  onClose: () => void
}

export const DialogDesktop: React.FC<Props> = props => {
  return (
    <div className='app-dialog-desktop'>
      <header className='app-dialog-desktop__header'>
        <Button variant='icon' onClick={props.onClose}>
          <span className='far fa-times-circle' aria-hidden='true'></span>
        </Button>
      </header>

      <main className='app-dialog-desktop__body'>{props.children}</main>
    </div>
  )
}
