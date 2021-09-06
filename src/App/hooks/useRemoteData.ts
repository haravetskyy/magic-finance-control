import { RemoteData, remoteData } from 'lib/remoteData'
import { useCallback, useEffect, useState } from 'react'

export function useRemoteData<A>(action: () => Promise<A>): [RemoteData<A>, () => void] {
  const [data, setData] = useState(remoteData.initial<A>())

  const [updateCounter, setUpdateCounter] = useState(0)

  const forceUpdate = useCallback(() => setUpdateCounter(c => c + 1), [])

  const toRemoteData = useCallback(() => {
    setData(remoteData.pending())

    action()
      .then(data => setData(remoteData.success(data)))
      .catch(error => setData(remoteData.failure(error)))
    // eslint-disable-next-line
  }, [])

  // eslint-disable-next-line
  useEffect(toRemoteData, [updateCounter])

  return [data, forceUpdate]
}
