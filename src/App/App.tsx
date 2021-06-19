import { User } from 'lib/auth'
import { auth } from 'lib/firebase'
import React from 'react'
import { AccountsList } from './Accounts'
import './App.scss'
import { SignUpForm } from './SignUpForm'

function App() {
  const [user, setUser] = React.useState<User | null>(null)

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user !== null && user.email !== null) {
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
