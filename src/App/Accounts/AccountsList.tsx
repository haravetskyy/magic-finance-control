import { Button } from 'App/components/Button'
import { Dialog } from 'App/components/Dialog'
import { Account } from 'lib/accounts'
import React from 'react'
import { AddAccount } from './AddAccount'

type AccountProps = {
  account: Account
  onEdit: () => void
}

export const AccountItem: React.FC<AccountProps> = props => {
  return (
    <div className='app-account'>
      <div className='app-account__text-wrapper'>
        <h3 className='app-account__name'>{props.account.name}</h3>
        <h4 className='app-account__currency'>{props.account.currency}</h4>
      </div>

      <Button className='app-account__button' variant='icon' onClick={props.onEdit}>
        <img
          alt='Edit'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Edit_icon_%28the_Noun_Project_30184%29.svg/1024px-Edit_icon_%28the_Noun_Project_30184%29.svg.png'
        />
      </Button>
    </div>
  )
}

type AccountsListProps = {
  userUID: string
}

export const AccountsList: React.FC<AccountsListProps> = ({ userUID }) => {
  const [isOpened, setIsOpened] = React.useState(false)
  const [accounts, setAccounts] = React.useState<Array<Account>>([])

  React.useEffect(() => {
    // TODO
    // getAccounts(userUID)
  }, [])

  const handleSubmit = (account: Account) => {
    setIsOpened(false)
  }

  const handleEdit = () => {
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
          <AccountItem key={account.name} account={account} onEdit={handleEdit} />
        ))}
      </div>
    </>
  )
}
