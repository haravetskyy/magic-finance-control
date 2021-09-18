import { Button } from 'App/components/Button'
import { Dialog } from 'App/components/Dialog'
import { Loader } from 'App/components/Loader'
import { useRemoteData } from 'App/hooks/useRemoteData'
import {
  CreateOperation,
  createOperation,
  getOperations,
  Operation,
  removeOperation,
  updateOperation,
} from 'lib/operations'
import { match } from 'lib/remoteData'
import React, { FC } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { AddOperation } from './Operations/AddOperation'
import { OperationItem } from './Operations/OperationItem'

type RouteParams = { accountId: string }

type Props = { userId: string }

export const Account: FC<Props> = props => {
  const [isOpened, setIsOpened] = React.useState(false)
  const { params } = useRouteMatch<RouteParams>()
  const [editableOperation, setEditableOperation] = React.useState<Operation | null>(null)

  const [operations, refreshOperations] = useRemoteData(() =>
    getOperations(props.userId, params.accountId),
  )

  const handleSubmit = (operation: CreateOperation | Operation) => {
    if ('uid' in operation) {
      updateOperation(props.userId, params.accountId, operation).then(() => {
        setIsOpened(false)
        setEditableOperation(null)
        refreshOperations()
      })
    } else {
      createOperation(props.userId, params.accountId, operation).then(() => {
        setIsOpened(false)
        refreshOperations()
      })
    }
  }

  const handleEdit = (operation: Operation) => {
    setIsOpened(true)
    setEditableOperation(operation)
  }

  const handleDelete = (operationUid: string) => {
    if (window.confirm('Are you sure you want to delete?')) {
      removeOperation(props.userId, params.accountId, operationUid).then(refreshOperations)
    }
  }

  const operationsList = match(operations, {
    onInitial: () => <Loader />,
    onPending: () => <Loader />,
    onSuccess: ({ data }) => (
      <div className='operation-wrapper'>
        {data.map(operation => (
          <OperationItem
            key={operation.uid}
            operation={operation}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    ),
    onFailure: () => null,
  })

  return (
    <>
      {operationsList}

      <Button variant='icon' onClick={() => setIsOpened(true)} className='add-account__button'>
        +
      </Button>

      {isOpened && (
        <Dialog onClose={() => setIsOpened(false)}>
          <AddOperation editableOperation={editableOperation} onSubmit={handleSubmit} />
        </Dialog>
      )}
    </>
  )
}
