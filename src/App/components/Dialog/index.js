import React from 'react'

import { useIsMobileDevice } from 'App/hooks/useIsMobileDevice'
import { DialogMobile } from './DialogMobile'
import { DialogDesktop } from './DialogDesktop'

import './Dialog.scss'

export const Dialog = props => {
  const isMobileDevice = useIsMobileDevice()

  return (
    <div className='app-dialog-wrapper'>
      {isMobileDevice ? <DialogMobile {...props} /> : <DialogDesktop {...props} />}
    </div>
  )
}
