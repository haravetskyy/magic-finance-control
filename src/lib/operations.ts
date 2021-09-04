import { Account, Currency } from './accounts'
import { firestore } from './firebase'

// TODO:

// 1. Add more categories

export type Category =
  | 'Food'
  | 'Transport'
  | 'Clothes'
  | 'Apartment'
  | 'Healthcare'
  | 'Beauty'
  | 'Communication'
  | 'Pet'
  | 'Charity'
  | 'Uncategorized'

export type CreateOperation = {
  amount: number
  currency: Currency
  category: Category
  date: Date
  description: string
}

export type Operation = CreateOperation & {
  uid: string
}

export const createOperation = (userUID: string, accountUID: string, operation: CreateOperation) =>
  firestore
    .collection('users')
    .doc(userUID)
    .collection('accounts')
    .doc(accountUID)
    .collection('operations')
    .add(operation)
