import { auth, firestore } from './firebase'

export const createUser = user =>
  auth.createUserWithEmailAndPassword(user.email, user.password).then(userCred =>
    firestore.collection('users').add({
      uid: userCred.user.uid,
      email: userCred.user.email,
    }),
  )

export const signIn = (email, password) => auth.signInWithEmailAndPassword(email, password)
