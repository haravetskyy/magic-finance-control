import { Button } from 'App/components/Button'
import { Dialog } from 'App/components/Dialog'
import React from 'react'
import { FC } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { AddOperation } from './Operations/AddOperation'

type RouteParams = { accountId: string }
type Props = { userId: string }

export const Account: FC<Props> = props => {
  const [isOpened, setIsOpened] = React.useState(false)
  const { params } = useRouteMatch<RouteParams>()
  console.log(params.accountId)

  return (
    <>
      <Button variant='icon' onClick={() => setIsOpened(true)} className='add-account__button'>
        +
      </Button>

      {isOpened && (
        <Dialog onClose={() => setIsOpened(false)}>
          <AddOperation accountId={params.accountId} userId={props.userId} />
        </Dialog>
      )}
    </>
  )
}
