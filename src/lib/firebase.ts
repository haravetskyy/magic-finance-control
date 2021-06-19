import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCVzqfifbu7ou0qzMc3Wo9qGXY1s3278Y0',
  authDomain: 'magic-finance-control.firebaseapp.com',
  projectId: 'magic-finance-control',
  storageBucket: 'magic-finance-control.appspot.com',
  messagingSenderId: '794185260506',
  appId: '1:794185260506:web:5d63b1c44b7de328b974e3',
  measurementId: 'G-N4P6QEXV8M',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const firestore = firebaseApp.firestore()

export const auth = firebaseApp.auth()
