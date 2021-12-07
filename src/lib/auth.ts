import { Email, NonBlankString } from './Data/String'
import { auth, firestore } from './firebase'

type AuthCredentials = {
  email: Email
  password: NonBlankString
}

export type User = {
  uid: string
  email: string
}

export type CreateUser = {
  email: Email
  password: string
}

export const createUser = (credentials: CreateUser) =>
  auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(({ user }) => {
    if (user !== null) {
      return firestore.collection('users').add({
        uid: user.uid,
        email: user.email,
      })
    }
  })

export const signIn = ({ email, password }: AuthCredentials) =>
  auth.signInWithEmailAndPassword(email, password)
