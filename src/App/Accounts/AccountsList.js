import React from 'react'
import { Button } from 'App/components/Button'
import { Dialog } from 'App/components/Dialog'
import { AddAccount } from './AddAccount'
import { append } from 'lib/array'

export const AccountsList = props => {
  const [isOpened, setIsOpened] = React.useState(false)
  const [accounts, setAccounts] = React.useState([])

  const handleAddAccount = account => {
    setAccounts(append(accounts, account))
    setIsOpened(false)
  }

  return (
    <>
      <Button variant='icon' onClick={() => setIsOpened(true)}>
        +
      </Button>

      {isOpened ? (
        <Dialog onClose={() => setIsOpened(false)}>
          <AddAccount onAddAccount={handleAddAccount} />
        </Dialog>
      ) : null}
    </>
  )
}
