import { firestore } from './firebase'

export type Account = {
  name: string
  currency: string
}

export const createAccount = (userUID: string, account: Account) =>
  firestore.collection('users').doc(userUID).collection('accounts').add(account)

export const getAccounts = (userUID: string) =>
  firestore.collection('users').doc(userUID).collection('accounts').get()
