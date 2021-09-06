import { SelectOptions } from 'App/components/Select'
import { Currency } from './accounts'
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

export const categories: SelectOptions<Category> = [
  { label: 'Food', value: 'Food' },
  { label: 'Transport', value: 'Transport' },
]

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
