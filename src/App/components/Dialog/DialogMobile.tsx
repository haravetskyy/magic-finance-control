import { Button } from 'App/components/Button'
import './Dialog.scss'

type Props = {
  children: JSX.Element
  onClose: () => void
}

export const DialogMobile: React.FC<Props> = props => {
  return (
    <div className='app-dialog-mobile'>
      <header className='app-dialog-mobile__header'>
        <Button variant='icon' onClick={props.onClose}>
          x
        </Button>
      </header>

      <main className='app-dialog-mobile__body'>{props.children}</main>
    </div>
  )
}
