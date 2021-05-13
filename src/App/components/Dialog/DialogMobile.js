import React from 'react'
import './Dialog.scss'
import { Button } from 'App/components/Button'

export const DialogMobile = props => {
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
