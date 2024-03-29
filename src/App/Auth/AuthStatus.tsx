import { head } from 'lib/Data/Array'
import { auth, firestore } from 'lib/firebase'
import { remoteData, RemoteData } from 'lib/remoteData'
import { useEffect, useState } from 'react'

type Props = {
  children: (userId: RemoteData<string>) => JSX.Element
}

export function AuthStatus(props: Props) {
  const [userId, setUserId] = useState<RemoteData<string>>(remoteData.initial())

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUserId(remoteData.pending())

      if (user !== null) {
        firestore
          .collection('users')
          .where('uid', '==', user.uid)
          .get()
          .then(result => {
            const user = head(result.docs)

            if (user) {
              setUserId(remoteData.success(user.id))
            } else {
              setUserId(remoteData.failure(new Error('User was not found!')))
            }
          })
      } else {
        setUserId(remoteData.failure(new Error('User is not logged in!')))
      }
    })
  }, [])

  return props.children(userId)
}
