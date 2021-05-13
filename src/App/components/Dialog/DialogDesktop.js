import React from 'react'
import './Dialog.scss'
import { Button } from 'App/components/Button'

export const DialogDesktop = props => {
  return (
    <div className='app-dialog-desktop'>
      <header className='app-dialog-desktop__header'>
        <Button variant='icon' onClick={props.onClose}>
          x
        </Button>
      </header>

      <main className='app-dialog-desktop__body'>{props.children}</main>
    </div>
  )
}
