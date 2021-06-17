import React from 'react'
import { Button } from 'App/components/Button'
import { Dialog } from 'App/components/Dialog'
import { AddAccount } from './AddAccount'
import { append } from 'lib/array'
import { getAccounts } from 'lib/accounts'

export const Account = props => {
  return (
    <div className='app-account'>
      <div className='app-account__text-wrapper'>
        <h3 className='app-account__name'>{props.account.name}</h3>
        <h4 className='app-account__currency'>{props.account.currency}</h4>
      </div>

      <Button
        className='app-account__button'
        variant='icon'
        onClick={() => props.onEdit(props.account)}>
        <img
          alt='Edit'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Edit_icon_%28the_Noun_Project_30184%29.svg/1024px-Edit_icon_%28the_Noun_Project_30184%29.svg.png'
        />
      </Button>
    </div>
  )
}

export const AccountsList = ({ userUID }) => {
  const [isOpened, setIsOpened] = React.useState(false)
  const [accounts, setAccounts] = React.useState([])

  React.useEffect(() => {
    // getAccounts(userUID)
  }, [])

  const handleSubmit = account => {
    // setAccounts(append(accounts, account))
    // addAccount(account)
    setIsOpened(false)
  }

  const handleEdit = account => {
    setIsOpened(true)
  }

  return (
    <>
      <Button variant='icon' onClick={() => setIsOpened(true)}>
        +
      </Button>

      {isOpened ? (
        <Dialog onClose={() => setIsOpened(false)}>
          <AddAccount onSubmit={handleSubmit} />
        </Dialog>
      ) : null}

      <div>
        {accounts.map(account => (
          <Account key={account.name} account={account} onEdit={handleEdit} />
        ))}
      </div>
    </>
  )
}
