import { Button } from 'App/components/Button'
import { Dialog } from 'App/components/Dialog'
import { Account, createAccount, CreateAccount, getAccounts } from 'lib/accounts'
import React from 'react'
import { AddAccount } from './AddAccount'

type AccountProps = {
  account: Account
  onEdit: () => void
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
          <Button className='app-account__button' variant='icon' onClick={props.onEdit}>
            <img
              alt='Edit'
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Edit_icon_%28the_Noun_Project_30184%29.svg/1024px-Edit_icon_%28the_Noun_Project_30184%29.svg.png'
            />
          </Button>
          <Button className='app-account__button' variant='icon' onClick={props.onEdit}>
            <img
              alt='Delete'
              src='https://icons-for-free.com/iconfiles/png/512/delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588.png'
            />
          </Button>
        </div>
      </div>
      <div className='app-account__indent'>
        <p className='app-account__divider-line'></p>
      </div>
    </div>
  )
}

type AccountsListProps = {
  userUid: string
}

export const AccountsList: React.FC<AccountsListProps> = ({ userUid }) => {
  const [isOpened, setIsOpened] = React.useState(false)
  const [accounts, setAccounts] = React.useState<Array<Account>>([])

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

  const handleSubmit = (account: CreateAccount) => {
    createAccount(userUid, account).then(() => {
      setIsOpened(false)

      return refreshAccounts()
    })
  }

  const handleEdit = () => {
    setIsOpened(true)
  }

  return (
    <>
      <Button variant='icon' onClick={() => setIsOpened(true)} className='add-account__button'>
        +
      </Button>

      {isOpened ? (
        <Dialog onClose={() => setIsOpened(false)}>
          <AddAccount onSubmit={handleSubmit} />
        </Dialog>
      ) : null}

      <div className='account-wrapper'>
        {accounts.map(account => (
          <AccountItem key={account.uid} account={account} onEdit={handleEdit} />
        ))}
      </div>
    </>
  )
}
