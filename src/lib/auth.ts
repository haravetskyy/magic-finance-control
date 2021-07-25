import { auth, firestore } from './firebase'

type AuthCredentials = {
  email: string
  password: string
}

export type User = {
  uid: string
  email: string
}

export const createUser = (credentials: AuthCredentials) =>
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
