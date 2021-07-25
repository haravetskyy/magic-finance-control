import { Loader } from 'App/components/Loader'
import { match, RemoteData } from 'lib/remoteData'
import { FC } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

type Props = RouteProps & { authStatus: RemoteData<unknown> }

export const LoginRoute: FC<Props> = ({ authStatus, ...props }) =>
  match(authStatus, {
    onInitial: () => <Loader />,
    onPending: () => <Loader />,
    onSuccess: () => <Redirect to='/' />,
    onFailure: () => <Route {...props} />,
  })
