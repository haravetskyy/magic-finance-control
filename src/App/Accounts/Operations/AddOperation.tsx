import { Button } from 'App/components/Button'
import { DateField, NumberField } from 'App/components/Input'
import { SelectField } from 'App/components/Select'
import { TextAreaField } from 'App/components/TextArea'
import { useForm } from 'App/hooks/useForm'
import { currencies } from 'lib/accounts'
import { of } from 'lib/Data/Array'
import { fromPredicate, validationError, validators } from 'lib/Form'
import { categories, CreateOperation, Operation } from 'lib/operations'
import { FC } from 'react'
import './Operations.scss'

type Props = {
  onSubmit: (operation: CreateOperation) => void
  editableOperation: Operation | null
}

const initialValues: CreateOperation = {
  amount: 0,
  currency: '$',
  category: 'Uncategorized',
  date: new Date(),
  description: '',
}

export const AddOperation: FC<Props> = props => {
  const form = useForm({
    initialValues: props.editableOperation || initialValues,
    validationStrategy: 'onBlur',
    validators: () => ({
      amount: validators.nonZeroNumber(),
      date: fromPredicate({
        predicate: (v: Date) => Number(v) <= Date.now(),
        onFailure: () => of(validationError('Date must be smaller or equal to current date!')),
      }),
    }),
    onSubmit: props.onSubmit,
  })

  return (
    <form className='operation-form__container'>
      <NumberField {...form.fieldProps('amount')} placeholder='Amount' id='amount' />

      <SelectField {...form.fieldProps('currency')} hiddenLabel='Currency' options={currencies} />

      <SelectField {...form.fieldProps('category')} hiddenLabel='Category' options={categories} />

      <DateField {...form.fieldProps('date')} className='operation-form__date-input' />

      <TextAreaField {...form.fieldProps('description')} placeholder='Description' />

      <div>
        <Button type='submit' onClick={form.handleSubmit} variant='primary'>
          Submit
        </Button>

        <Button type='reset' onClick={form.handleReset} variant='danger'>
          Reset
        </Button>
      </div>
    </form>
  )
}
