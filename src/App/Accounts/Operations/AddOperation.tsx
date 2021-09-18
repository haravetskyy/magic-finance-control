import { Button } from 'App/components/Button'
import { DateField, NumberField } from 'App/components/Input'
import { SelectField } from 'App/components/Select'
import { TextAreaField } from 'App/components/TextArea'
import { useForm } from 'App/hooks/useForm'
import { currencies, Currency } from 'lib/accounts'
import { of } from 'lib/Data/Array'
import { fromPredicate, validationError } from 'lib/Form'
import { categories, Category, CreateOperation, Operation } from 'lib/operations'
import { FC } from 'react'
import './Operations.scss'

type Props = {
  onSubmit: (operation: CreateOperation) => void
  editableOperation: Operation | null
}

const toFormValues = (data: Operation | null): CreateOperation =>
  data || {
    amount: 0,
    currency: '' as Currency,
    category: 'Uncategorized' as Category,
    date: new Date(),
    description: '',
  }

export const AddOperation: FC<Props> = props => {
  const { fieldProps, handleSubmit } = useForm({
    initialValues: toFormValues(props.editableOperation),
    onSubmit: props.onSubmit,
    validationStrategy: 'onBlur',
    validators: _ => ({
      amount: fromPredicate({
        predicate: v => v !== 0,
        onFailure: () => of(validationError('Amount must not be equal to 0!')),
      }),
      date: fromPredicate({
        predicate: v => Number(v) <= Date.now(),
        onFailure: () => of(validationError('Date must be smaller or equal to current date!')),
      }),
    }),
  })

  return (
    <form className='operation-form__container'>
      <NumberField {...fieldProps('amount')} placeholder='Amount' id='amount' />

      <SelectField {...fieldProps('currency')} hiddenLabel='Currency' options={currencies} />

      <SelectField {...fieldProps('category')} hiddenLabel='Category' options={categories} />

      <DateField {...fieldProps('date')} className='operation-form__date-input' />

      <TextAreaField {...fieldProps('description')} placeholder='Description' />

      <Button onClick={handleSubmit} variant='primary'>
        Submit
      </Button>
    </form>
  )
}
