import { auth, firestore } from 'lib/firebase'
import React from 'react'
import { AccountsList } from './Accounts'
import './App.scss'
import { NavBar } from './NavBar'
import { SignUpForm } from './SignUpForm'

function App() {
  const [userUid, setUserUid] = React.useState<string | null>(null)

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user !== null) {
        firestore
          .collection('users')
          .doc(user.uid)
          .get()
          .then(({ id }) => setUserUid(id))
      }
    })
  }, [])

  return (
    <div className='app'>
      <NavBar />
      <div className='app__container'>
        {userUid !== null ? <AccountsList userUid={userUid} /> : <SignUpForm />}
      </div>
    </div>
  )
}

export default App
