import { remoteData } from 'lib/remoteData'
import { BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { AccountsList } from './Accounts'
import { Account } from './Accounts/Account'
import './App.scss'
import { AuthStatus, LoginRoute, ProtectedRoute, SignInForm, SignUpForm } from './Auth'
import { NavBar } from './NavBar'

function App() {
  const Home = ({ userId }: { userId: string }) => (
    <div className='app__container'>
      <AccountsList userId={userId} />
    </div>
  )

  return (
    <div className='app'>
      <BrowserRouter>
        <Switch>
          <AuthStatus>
            {userId => (
              <>
                {remoteData.isSuccess(userId) && <NavBar />}
                <ProtectedRoute
                  authStatus={userId}
                  exact
                  path='/'
                  component={() => <Redirect to='/accounts' />}
                />
                <ProtectedRoute authStatus={userId} exact path='/accounts' component={Home} />
                <ProtectedRoute
                  authStatus={userId}
                  exact
                  path='/accounts/:accountId'
                  component={Account}
                />
                <LoginRoute authStatus={userId} exact path='/sign-in' component={SignInForm} />
                <LoginRoute authStatus={userId} exact path='/sign-up' component={SignUpForm} />
              </>
            )}
          </AuthStatus>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
