import { Button } from 'App/components/Button'
import { Card } from 'App/components/Card'
import { InputField } from 'App/components/InputField'
import React from 'react'
import isEmail from 'validator/es/lib/isEmail'
import './SignUpForm.scss'
import { createUser } from 'lib/auth'

export const SignUpForm = () => {
  const [form, setForm] = React.useState({
    email: {
      value: '',
      touched: false,
    },
    password: {
      value: '',
      touched: false,
    },
    confirmPassword: {
      value: '',
      touched: false,
    },
  })

  const handleEmailChange = e =>
    setForm({
      ...form,
      email: {
        ...form.email,
        value: e.currentTarget.value,
      },
    })

  const handleEmailBlur = () =>
    setForm({
      ...form,
      email: {
        ...form.email,
        touched: true,
      },
    })

  const handlePasswordChange = e =>
    setForm({
      ...form,
      password: {
        ...form.password,
        value: e.currentTarget.value,
      },
    })

  const handlePasswordBlur = () =>
    setForm({
      ...form,
      password: {
        ...form.password,
        touched: true,
      },
    })

  const isLengthValid = form.password.value.length >= 6 && form.password.value.length <= 24
  const lengthErrorMessage = 'Password length must be between 6 and 24 characters!'

  const hasOneCapitalLetter = /[A-Z]/.test(form.password.value)
  const capitalLetterErrorMessage = 'Password must have at least one capital letter'

  const hasOneDigit = /[0-9]/.test(form.password.value)
  const digitErrorMessage = 'Pasword must have at least one digit'

  const hasOneSmallLetter = /[a-z]/.test(form.password.value)
  const smallLetterErrorMessage = 'Pasword must have at least one small letter'

  const isPasswordValid = isLengthValid && hasOneCapitalLetter && hasOneDigit && hasOneSmallLetter

  const passwordErrors = [
    isLengthValid ? null : lengthErrorMessage,
    hasOneCapitalLetter ? null : capitalLetterErrorMessage,
    hasOneDigit ? null : digitErrorMessage,
    hasOneSmallLetter ? null : smallLetterErrorMessage,
  ].filter(error => error !== null)

  const handleConfirmPasswordChange = e =>
    setForm({
      ...form,
      confirmPassword: {
        ...form.confirmPassword,
        value: e.currentTarget.value,
      },
    })

  const handleConfirmPasswordBlur = () =>
    setForm({
      ...form,
      confirmPassword: {
        ...form.confirmPassword,
        touched: true,
      },
    })

  const isEmailValid = isEmail(form.email.value)

  const isConfirmPasswordValid = form.password.value === form.confirmPassword.value

  const isFormValid = isEmailValid && isPasswordValid && isConfirmPasswordValid

  const handleSubmit = e => {
    const user = {
      email: form.email.value,
      password: form.password.value,
    }

    if (isFormValid) {
      createUser(user)
    }

    e.preventDefault()
  }

  return (
    <div className='sign-up__container'>
      <Card>
        <form className='sign-up__form'>
          <h1 className='sign-up__heading'>Sign Up</h1>

          <InputField
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
            placeholder='Email Address'
            type='email'
            value={form.email.value}
            touched={form.email.touched}
            valid={isEmailValid}
            errors={['Email is not valid']}
          />

          <InputField
            onBlur={handlePasswordBlur}
            onChange={handlePasswordChange}
            valid={isPasswordValid}
            errors={passwordErrors}
            placeholder='Password'
            type='password'
            value={form.password.value}
            touched={form.password.touched}
          />

          <InputField
            onBlur={handleConfirmPasswordBlur}
            onChange={handleConfirmPasswordChange}
            placeholder='Confirm password'
            type='password'
            value={form.confirmPassword.value}
            touched={form.confirmPassword.touched}
            valid={isConfirmPasswordValid}
            errors={['Passwords do not match']}
          />

          <Button variant='success' onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </Card>
    </div>
  )
}
