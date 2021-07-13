import { Button } from 'App/components/Button'
import { Dialog } from 'App/components/Dialog'
import {
  Account,
  createAccount,
  CreateAccount,
  getAccounts,
  removeAccount,
  updateAccount,
} from 'lib/accounts'
import React from 'react'
import { AddAccount } from './AddAccount'

type AccountProps = {
  account: Account
  onEdit: (account: Account) => void
  onDelete: (accountUid: string) => void
}

export const AccountItem: React.FC<AccountProps> = props => {
  return (
    <div className='app-account'>
      <div className='app-account__container'>
        <div className='app-account__text-wrapper'>
          <h3 className='app-account__name'>{props.account.name}</h3>
          <h4 className='app-account__currency'>{props.account.currency}</h4>
        </div>

        <div className='app-account__button-wrapper'>
          <Button
            className='app-account__button'
            variant='icon'
            onClick={() => props.onEdit(props.account)}>
            <span className='far fa-edit'></span>
          </Button>
          <Button
            className='app-account__button'
            variant='icon'
            onClick={() => props.onDelete(props.account.uid)}>
            <span className='fas fa-eraser'></span>
          </Button>
        </div>
      </div>

      <hr className='app-account__line'></hr>
    </div>
  )
}

type AccountsListProps = {
  userUid: string
}

export const AccountsList: React.FC<AccountsListProps> = ({ userUid }) => {
  const [isOpened, setIsOpened] = React.useState(false)
  const [accounts, setAccounts] = React.useState<Array<Account>>([])
  const [editableAccount, setEditableAccount] = React.useState<Account | null>(null)

  const refreshAccounts = () =>
    getAccounts(userUid).then(({ docs }) => {
      const accounts = docs.map(doc => {
        const { name, currency } = doc.data()

        return { uid: doc.id, name, currency }
      })
      setAccounts(accounts)
    })

  React.useEffect(() => {
    refreshAccounts()
  }, [])

  const handleSubmit = (account: CreateAccount | Account) => {
    if ('uid' in account) {
      updateAccount(userUid, account).then(() => {
        setIsOpened(false)

        return refreshAccounts()
      })
    } else {
      createAccount(userUid, account).then(() => {
        setIsOpened(false)

        return refreshAccounts()
      })
    }
  }

  const handleEdit = (account: Account) => {
    setIsOpened(true)
    setEditableAccount(account)
  }

  const handleDelete = (accountUid: string) => {
    if (window.confirm('Are you sure you want to delete?')) {
      removeAccount(userUid, accountUid).then(refreshAccounts)
    }
  }

  return (
    <>
      <Button variant='icon' onClick={() => setIsOpened(true)} className='add-account__button'>
        +
      </Button>

      {isOpened ? (
        <Dialog onClose={() => setIsOpened(false)}>
          <AddAccount editableAccount={editableAccount} onSubmit={handleSubmit} />
        </Dialog>
      ) : null}

      <div className='account-wrapper'>
        {accounts.map(account => (
          <AccountItem
            key={account.uid}
            account={account}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  )
}
