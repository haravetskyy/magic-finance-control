import { firestore } from './firebase'

export type Account = {
  uid: string
  name: string
  currency: string
}

export type CreateAccount = {
  name: string
  currency: string
}

export const createAccount = (userUID: string, account: CreateAccount) =>
  firestore.collection('users').doc(userUID).collection('accounts').add(account)

export const getAccounts = (userUID: string) =>
  firestore.collection('users').doc(userUID).collection('accounts').get()

export const removeAccount = (userUID: string, accountUID: string): Promise<void> =>
  firestore.collection('users').doc(userUID).collection('accounts').doc(accountUID).delete()
