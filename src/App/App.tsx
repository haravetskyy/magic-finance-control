import { auth, firestore } from 'lib/firebase'
import { failure, initial, RemoteData, success, pending, match } from 'lib/remoteData'
import React, { useEffect } from 'react'
import { AccountsList } from './Accounts'
import './App.scss'
import { NavBar } from './NavBar'
import { SignInForm } from 'App/AuthForm'
import { SignUpForm } from 'App/AuthForm'
import { Loader } from 'App/components/Loader'

function App() {
  const [userId, setUserId] = React.useState<RemoteData<string>>(initial())

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUserId(pending())

      if (user !== null) {
        firestore
          .collection('users')
          .doc(user.uid)
          .get()
          .then(({ id }) => setUserId(success(id)))
      } else {
        setUserId(failure(new Error('Invalid user')))
      }
    })
  }, [])

  return match(userId, {
    onInitial: () => <Loader />,
    onPending: () => <Loader />,
    onSuccess: rd => (
      <div className='app'>
        <NavBar />

        <div className='app__container'>
          <AccountsList userUid={rd.data} />
        </div>
      </div>
    ),
    onFailure: () => <SignInForm />,
  })
}

export default App
