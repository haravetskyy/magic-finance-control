import './Operations.scss'
import { Input, InputField } from 'App/components/Input'
import { Select, SelectField } from 'App/components/Select'
import { Button } from 'App/components/Button'
import { TextArea, TextAreaField } from 'App/components/TextArea'
import { useForm } from 'App/hooks/useForm'
import { Currency } from 'lib/accounts'
import { createOperation } from 'lib/operations'
import { FC } from 'react'
import { fromPredicate, sequence, validationError } from 'lib/Form'
import { of } from 'lib/Data'
import { Error } from 'App/components/Error'

type Props = {
  userId: string
  accountId: string
}

export const AddOperation: FC<Props> = props => {
  const currencies = [
    { label: 'US Dollar', value: 'USD' },
    { label: 'Euro', value: 'EUR' },
    { label: 'Hryvnia', value: 'UAH' },
  ]

  const accounts = [
    { label: 'Trip to US', value: 'us' },
    { label: 'New computer', value: 'pc' },
  ]

  const categories = [
    { label: 'Subscribtions', value: 'sub' },
    { label: 'Medicine', value: 'med' },
  ]

  const { fieldProps, handleSubmit } = useForm({
    initialValues: {
      amount: 0,
      currency: '' as Currency,
      category: 'Uncategorized' as const,
      date: new Date(),
      description: '',
    },
    onSubmit: operation =>
      createOperation(props.userId, props.accountId, operation)
        .then(console.log)
        .catch(console.error),
    validationStrategy: 'onBlur',
    validators: values => ({
      amount:
        // sequence(
        // fromPredicate({
        //   predicate: v => typeof v === 'number',
        //   onFailure: () => of(validationError('Amount must be a number')),
        // }),
        fromPredicate({
          predicate: v => v !== 0,
          onFailure: () => of(validationError('Amount must be greater or lower than 0')),
        }),
      // ),
    }),
  })

  // TODO:

  // 1. Валидация на тип (намбер) и на то чтоб значение не являлось нулем
  // 2. Нет валидации, так как валюта по умолчанию уже выбрана
  // 3. Валидация на выбор категории в общем (поле не может быть не тронутым)
  // 4. Дата по умолчанию уже выбрана
  // 5. Не обязательное поле

  return (
    <form className='operation-form__container'>
      <InputField {...fieldProps('amount')} placeholder='Amount' type='number' id='amount' />

      <SelectField {...fieldProps('currency')} hiddenLabel='Currency' options={currencies} />

      <SelectField {...fieldProps('category')} hiddenLabel='Category' options={categories} />

      <InputField
        {...(fieldProps('date') as any)}
        className='operation-form__date-input'
        type='date'
      />

      <TextAreaField {...fieldProps('description')} placeholder='Description' />

      <Button onClick={handleSubmit} variant='primary'>
        Submit
      </Button>
    </form>
  )
}
