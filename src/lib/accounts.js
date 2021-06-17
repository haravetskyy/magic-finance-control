import { firestore } from './firebase'

export const createAccount = (userUID, account) =>
  firestore.collection('users').doc(userUID).collection('accounts').add(account)

export const getAccounts = userUID =>
  firestore.collection('users').doc(userUID).collection('accounts').get()
