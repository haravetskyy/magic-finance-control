import { Button } from 'App/components/Button'
import { InputField } from 'App/components/InputField'
import { SelectField } from 'App/components/SelectField'
import { Account, CreateAccount } from 'lib/accounts'
import { isNonNullable } from 'lib/guards'
import React from 'react'
import './Accounts.scss'

const toInitialState = (data: CreateAccount | null) => ({
  name: {
    value: data === null ? '' : data.name,
    touched: false,
  },
  currency: {
    value: data === null ? '' : data.currency,
    touched: false,
  },
})

const currencies = [
  { label: 'US Dollar', value: 'USD' },
  { label: 'Euro', value: 'EUR' },
  { label: 'Hryvnia', value: 'UAH' },
]

type AddAccountProps = {
  editableAccount: Account | null
  onSubmit: (account: CreateAccount | Account) => void
}

export const AddAccount: React.FC<AddAccountProps> = props => {
  const initialState = toInitialState(props.editableAccount)

  const [form, setForm] = React.useState(initialState)

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = e =>
    setForm({
      ...form,
      name: {
        ...form.name,
        value: e.currentTarget.value,
      },
    })

  const handleNameBlur = () =>
    setForm({
      ...form,
      name: {
        ...form.name,
        touched: true,
      },
    })

  const handleCurrencyChange: React.ChangeEventHandler<HTMLSelectElement> = e =>
    setForm({
      ...form,
      currency: {
        ...form.currency,
        value: e.currentTarget.value,
      },
    })

  const handleCurrencyBlur = () =>
    setForm({
      ...form,
      currency: {
        ...form.currency,
        touched: true,
      },
    })

  const trimmedValue = form.name.value.trim()

  const isNotEmpty = trimmedValue !== ''
  const emptyErrorMessage = 'Account name must not be empty'

  const isLengthValid = trimmedValue.length <= 18
  const lengthErrorMessage = 'Account name length must be less than 18 characters!'

  const isNameValid = isLengthValid && isNotEmpty

  const nameErrors = [
    isLengthValid ? null : lengthErrorMessage,
    isNotEmpty ? null : emptyErrorMessage,
  ].filter(isNonNullable)

  const isCurrencyValid = form.currency.value !== ''

  const currencyErrors = ['Currency is required']

  const isFormValid = isNameValid && isCurrencyValid

  const handleSubmit = (e: React.SyntheticEvent) => {
    const account = {
      name: form.name.value,
      currency: form.currency.value,
    }

    if (isFormValid) {
      if (props.editableAccount === null) {
        props.onSubmit(account)
      } else {
        props.onSubmit({ uid: props.editableAccount.uid, ...account })
      }
    }

    e.preventDefault()
  }

  return (
    <form className='add-account-form'>
      <InputField
        onChange={handleNameChange}
        onBlur={handleNameBlur}
        value={form.name.value}
        touched={form.name.touched}
        valid={isNameValid}
        errors={nameErrors}
        className='add-account-form__input'
        type='text'
        placeholder='Account name'
      />
      <SelectField
        onChange={handleCurrencyChange}
        touched={form.currency.touched}
        valid={isCurrencyValid}
        errors={currencyErrors}
        onBlur={handleCurrencyBlur}
        value={form.currency.value}
        options={currencies}
        hiddenLabel='Choose a currency'
      />

      <Button variant='primary' className='add-account-form__button' onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  )
}
