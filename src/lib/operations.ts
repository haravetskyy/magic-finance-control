import { SelectOptions } from 'App/components/Select'
import { Currency } from './accounts'
import { firestore } from './firebase'

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

export const getOperations = (userUID: string, accountUID: string): Promise<Array<Operation>> =>
  firestore
    .collection('users')
    .doc(userUID)
    .collection('accounts')
    .doc(accountUID)
    .collection('operations')
    .get()
    .then(({ docs }) =>
      docs.map(doc => {
        const { amount, currency, category, date, description } = doc.data()

        return {
          amount,
          currency,
          category,
          date: date.toDate(),
          description,
          uid: doc.id,
        }
      }),
    )

export const removeOperation = (
  userUID: string,
  accountUID: string,
  operationUID: string,
): Promise<void> =>
  firestore
    .collection('users')
    .doc(userUID)
    .collection('accounts')
    .doc(accountUID)
    .collection('operations')
    .doc(operationUID)
    .delete()

export const updateOperation = (
  userUID: string,
  accountUID: string,
  { uid, ...updatedData }: Operation,
) =>
  firestore
    .collection('users')
    .doc(userUID)
    .collection('accounts')
    .doc(accountUID)
    .collection('operations')
    .doc(uid)
    .update(updatedData)
