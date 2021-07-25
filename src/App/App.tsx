import { SignInForm, SignUpForm } from 'App/AuthForm'
import { Loader } from 'App/components/Loader'
import { auth, firestore } from 'lib/firebase'
import { failure, initial, match, pending, RemoteData, success } from 'lib/remoteData'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AccountsList } from './Accounts'
import './App.scss'
import { NavBar } from './NavBar'

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

  const Home = match(userId, {
    onInitial: () => <Loader />,
    onPending: () => <Loader />,
    onSuccess: rd => (
      <>
        <NavBar />

        <div className='app__container'>
          <AccountsList userUid={rd.data} />
        </div>
      </>
    ),
    onFailure: () => <SignUpForm />,
  })

  return (
    <div className='app'>
      <Router>
        <Switch>
          <Route path='/sign-in' component={SignInForm} />
          <Route path='/sign-up' component={SignUpForm} />
          <Route path='/' children={Home} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
