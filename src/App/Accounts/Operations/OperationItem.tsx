import { Button } from 'App/components/Button'
import { Dialog } from 'App/components/Dialog'
import { Operation } from 'lib/operations'
import React from 'react'

type OperationProps = {
  operation: Operation
  onEdit: (operation: Operation) => void
  onDelete: (operationUid: string) => void
}

const dateToString = (date: Date): string => date.toISOString().substring(0, 10)

export const OperationItem: React.FC<OperationProps> = props => {
  const [isOpened, setIsOpened] = React.useState(false)

  return (
    <div className='app-operation'>
      <div className='app-operation__container'>
        <div className='app-operation__primary-wrapper'>
          <div className='app-operation__amount-wrapper'>
            <h2 className='app-operation__amount'>{props.operation.amount}</h2>
            <span className='app-operation__currency'>{props.operation.currency}</span>
          </div>
          <div className='app-operation__secondary-wrapper'>
            <span className='app-operation__category'>{props.operation.category}</span>
            <h3 className='app-operation__date'>{dateToString(props.operation.date)}</h3>
          </div>
        </div>
        <div className='app-operation__button-wrapper'>
          <Button
            className='app-operation__button'
            variant='icon'
            onClick={isOpened ? () => setIsOpened(false) : () => setIsOpened(true)}>
            <span className='fas fa-info-circle'></span>
          </Button>
          <Button
            className='app-operation__button'
            variant='icon'
            onClick={() => props.onEdit(props.operation)}>
            <span className='far fa-edit'></span>
          </Button>
          <Button
            className='app-operation__button'
            variant='icon'
            onClick={() => props.onDelete(props.operation.uid)}>
            <span className='fas fa-eraser'></span>
          </Button>
        </div>
      </div>

      {isOpened ? (
        <>
          <hr className='app-operation__horizontal-line app-operation__horizontal-line--secondary'></hr>

          <p id='description' className='app-operation__description'>
            {props.operation.description}
          </p>
        </>
      ) : null}

      <hr className='app-operation__horizontal-line'></hr>
    </div>
  )
}
