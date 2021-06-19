import { useIsMobileDevice } from 'App/hooks/useIsMobileDevice'
import './Dialog.scss'
import { DialogDesktop } from './DialogDesktop'
import { DialogMobile } from './DialogMobile'

type Props = {
  children: JSX.Element
  onClose: () => void
}

export const Dialog: React.FC<Props> = props => {
  const isMobileDevice = useIsMobileDevice()

  return (
    <div className='app-dialog-wrapper'>
      {isMobileDevice ? <DialogMobile {...props} /> : <DialogDesktop {...props} />}
    </div>
  )
}
