import { Button } from 'App/components/Button'
import { Dialog } from 'App/components/Dialog'
import { Loader } from 'App/components/Loader'
import { useRemoteData } from 'App/hooks/useRemoteData'
import {
  Account,
  createAccount,
  CreateAccount,
  getAccounts,
  removeAccount,
  updateAccount,
} from 'lib/accounts'
import { match } from 'lib/remoteData'
import { FC, useState } from 'react'
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
  userId: string
}

export const AccountsList: FC<AccountsListProps> = ({ userId }) => {
  const [isOpened, setIsOpened] = useState(false)
  const [editableAccount, setEditableAccount] = useState<Account | null>(null)

  const [accounts, refreshAccounts] = useRemoteData(() => getAccounts(userId))

  const handleSubmit = (account: CreateAccount | Account) => {
    if ('uid' in account) {
      updateAccount(userId, account).then(() => {
        setIsOpened(false)
        setEditableAccount(null)
        refreshAccounts()
      })
    } else {
      createAccount(userId, account).then(() => {
        setIsOpened(false)
        refreshAccounts()
      })
    }
  }

  const handleEdit = (account: Account) => {
    setIsOpened(true)
    setEditableAccount(account)
  }

  const handleDelete = (accountUid: string) => {
    if (window.confirm('Are you sure you want to delete?')) {
      removeAccount(userId, accountUid).then(refreshAccounts)
    }
  }

  const renderAccounts = match(accounts, {
    onInitial: () => <Loader />,
    onPending: () => <Loader />,
    onSuccess: ({ data }) => (
      <div className='account-wrapper'>
        {data.map(account => (
          <AccountItem
            key={account.uid}
            account={account}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    ),
    onFailure: () => null,
  })

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

      {renderAccounts}
    </>
  )
}
