import { RemoteData } from 'lib/remoteData'
import { BrowserRouter, Switch } from 'react-router-dom'
import { AccountsList } from './Accounts'
import './App.scss'
import { AuthStatus, LoginRoute, ProtectedRoute, SignInForm, SignUpForm } from './Auth'
import { NavBar } from './NavBar'

function App() {
  const Home = ({ userId }: { userId: string }) => (
    <>
      <NavBar />
      <div className='app__container'>
        <AccountsList userId={userId} />
      </div>
    </>
  )

  const router = (userId: RemoteData<string>) => (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute authStatus={userId} exact path='/' component={Home} />
        <LoginRoute authStatus={userId} exact path='/sign-in' component={SignInForm} />
        <LoginRoute authStatus={userId} exact path='/sign-up' component={SignUpForm} />
      </Switch>
    </BrowserRouter>
  )

  return (
    <div className='app'>
      <AuthStatus>{router}</AuthStatus>
    </div>
  )
}

export default App
