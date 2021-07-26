import { firestore } from './firebase'

export type Account = {
  uid: string
  name: string
  currency: Currency
}

export type Currency = 'USD' | 'EUR' | 'UAH'

export type CreateAccount = {
  name: string
  currency: Currency
}

export const createAccount = (userUID: string, account: CreateAccount) =>
  firestore.collection('users').doc(userUID).collection('accounts').add(account)

export const getAccounts = (userUID: string): Promise<Array<Account>> =>
  firestore
    .collection('users')
    .doc(userUID)
    .collection('accounts')
    .get()
    .then(({ docs }) =>
      docs.map(doc => {
        const { name, currency } = doc.data()

        return { uid: doc.id, name, currency }
      }),
    )

export const removeAccount = (userUID: string, accountUID: string): Promise<void> =>
  firestore.collection('users').doc(userUID).collection('accounts').doc(accountUID).delete()

export const updateAccount = (userUID: string, { uid, ...updatedData }: Account) =>
  firestore.collection('users').doc(userUID).collection('accounts').doc(uid).update(updatedData)
