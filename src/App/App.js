import './App.scss'
import { AccountsList } from './Accounts'
import { SignUpForm } from './SignUpForm'
import { auth } from 'lib/firebase'
import { SignInForm } from './SignInForm'
import React from 'react'

function App() {
  // return <SignUpForm />

  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user !== null) {
        setUser({
          uid: user.uid,
          email: user.email,
        })
      }
    })
  }, [])

  return (
    <div className='app-container'>
      {/* <AccountsList /> */}
      {/* <SignUpForm /> */}
      {/* <SignInForm /> */}
      {user !== null ? <AccountsList userUID={user.uid} /> : <SignUpForm />}
    </div>
  )
}

export default App
