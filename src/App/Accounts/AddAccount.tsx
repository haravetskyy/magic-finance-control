import { Button } from 'App/components/Button'
import { TextField } from 'App/components/Input'
import { SelectField } from 'App/components/Select'
import { useForm } from 'App/hooks/useForm'
import { Account, CreateAccount, currencies } from 'lib/accounts'
import { validators } from 'lib/Form/Validation'
import React from 'react'
import './Accounts.scss'

const initialValues: CreateAccount = {
  name: '',
  currency: '$',
}

type AddAccountProps = {
  editableAccount: Account | null
  onSubmit: (account: CreateAccount | Account) => void
}

export const AddAccount: React.FC<AddAccountProps> = props => {
  const { fieldProps, handleSubmit } = useForm({
    initialValues: props.editableAccount || initialValues,
    validators: () => ({
      name: validators.maxLength(18),
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
      <TextField
        {...fieldProps('name')}
        className='add-account-form__input'
        placeholder='Account name'
      />

      <SelectField
        {...fieldProps('currency')}
        hiddenLabel='Choose a currency'
        options={currencies}
      />

      <Button
        type='submit'
        variant='primary'
        className='add-account-form__button'
        onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  )
}
