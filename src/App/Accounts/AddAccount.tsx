import { Button } from 'App/components/Button'
import { InputField } from 'App/components/InputField'
import { SelectField } from 'App/components/SelectField'
import { useForm } from 'App/hooks/useForm'
import { Account, CreateAccount, Currency } from 'lib/accounts'
import { validators } from 'lib/Form/Validation'
import React from 'react'
import './Accounts.scss'

type FormValues = {
  name: string
  currency: Currency
}

const toFormValues = (data: CreateAccount | null): FormValues => ({
  name: data === null ? '' : data.name,
  currency: data === null ? ('' as Currency) : data.currency,
})

const currencies: Array<{ label: string; value: Currency }> = [
  { label: 'US Dollar', value: 'USD' },
  { label: 'Euro', value: 'EUR' },
  { label: 'Hryvnia', value: 'UAH' },
]

type AddAccountProps = {
  editableAccount: Account | null
  onSubmit: (account: CreateAccount | Account) => void
}

export const AddAccount: React.FC<AddAccountProps> = props => {
  const { fieldProps, handleSubmit } = useForm({
    initialValues: toFormValues(props.editableAccount),
    validators: () => ({
      name: validators.maxLength(18),
      currency: validators.nonBlankString<Currency>(),
    }),
    validationStrategy: 'onBlur',
    onSubmit: values => {
      if (props.editableAccount === null) {
        props.onSubmit(values)
      } else {
        props.onSubmit({ uid: props.editableAccount.uid, ...values })
      }
    },
  })

  return (
    <form className='add-account-form'>
      <InputField
        {...fieldProps('name')}
        className='add-account-form__input'
        placeholder='Account name'
        type='text'
      />
      <SelectField
        {...fieldProps('currency')}
        hiddenLabel='Choose a currency'
        options={currencies}
      />

      <Button variant='primary' className='add-account-form__button' onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  )
}
