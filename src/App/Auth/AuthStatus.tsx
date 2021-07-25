import { auth, firestore } from 'lib/firebase'
import { failure, initial, pending, RemoteData, success } from 'lib/remoteData'
import { useEffect, useState } from 'react'

type Props = {
  children: (userId: RemoteData<string>) => JSX.Element
}

export function AuthStatus(props: Props) {
  const [userId, setUserId] = useState<RemoteData<string>>(initial())

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUserId(pending())

      if (user !== null) {
        firestore
          .collection('users')
          .doc(user.uid)
          .get()
          .then(({ id }) => setUserId(success(id)))
      } else {
        setUserId(failure(new Error('User is not logged in!')))
      }
    })
  }, [])

  return props.children(userId)
}
