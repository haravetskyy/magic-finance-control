import { Button } from 'App/components/Button'
import { DateField, NumberField } from 'App/components/Input'
import { SelectField } from 'App/components/Select'
import { TextAreaField } from 'App/components/TextArea'
import { useForm } from 'App/hooks/useForm'
import { currencies, Currency } from 'lib/accounts'
import { of } from 'lib/Data/Array'
import { fromPredicate, validationError } from 'lib/Form'
import { categories, Category, createOperation } from 'lib/operations'
import { FC } from 'react'
import './Operations.scss'

type Props = {
  userId: string
  accountId: string
}

export const AddOperation: FC<Props> = props => {
  const { fieldProps, handleSubmit } = useForm({
    initialValues: {
      amount: 0,
      currency: '' as Currency,
      category: 'Uncategorized' as Category,
      date: new Date(),
      description: '',
    },
    onSubmit: operation =>
      createOperation(props.userId, props.accountId, operation)
        .then(console.log)
        .catch(console.error),
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
