import { Loader } from 'App/components/Loader'
import { match, RemoteData } from 'lib/remoteData'
import { FC } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

type Props = Omit<RouteProps, 'children' | 'component' | 'render'> & {
  authStatus: RemoteData<string>
  component: FC<{ userId: string }>
}

export const ProtectedRoute: FC<Props> = ({ authStatus, ...props }) => {
  console.log(props)

  return match(authStatus, {
    onInitial: () => <Loader />,
    onPending: () => <Loader />,
    onSuccess: ({ data }) => (
      <Route {...props} component={() => props.component({ userId: data })} />
    ),
    onFailure: () => <Redirect to='/sign-in' />,
  })
}
