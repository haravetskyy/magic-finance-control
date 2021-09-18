import { RemoteData, remoteData } from 'lib/remoteData'
import { useCallback, useEffect, useState } from 'react'

export function useRemoteData<A>(action: () => Promise<A>): [RemoteData<A>, () => void] {
  const [data, setData] = useState(remoteData.initial<A>())

  const [updateCounter, setUpdateCounter] = useState(0)
  const [isActive, setIsActive] = useState(true)

  const forceUpdate = useCallback(() => setUpdateCounter(c => c + 1), [])

  useEffect(() => {
    setData(remoteData.pending())

    action()
      .then(data => {
        if (isActive) setData(remoteData.success(data))
      })
      .catch(error => setData(remoteData.failure(error)))

    return () => setIsActive(false)
    // eslint-disable-next-line
  }, [updateCounter])

  return [data, forceUpdate]
}
