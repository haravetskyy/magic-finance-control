import { Button } from 'App/components/Button'
import { Card } from 'App/components/Card'
import { Field } from 'App/components/Field'
import { Password } from './Password'
import React from 'react'
import isEmail from 'validator/es/lib/isEmail'
import './SignUpForm.scss'

export const SignInForm = () => {
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

  const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/

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

  const isPasswordValid = passwordRegExp.test(form.password.value)

  const isConfirmPasswordValid = form.password.value === form.confirmPassword.value

  const isFormValid = isEmailValid && isPasswordValid && isConfirmPasswordValid

  const handleSubmit = () => {
    const user = {
      email: form.email.value,
      password: form.password.value,
    }

    if (isFormValid) {
      alert(JSON.stringify(user))
    }
  }

  return (
    <div className='sign-up__container'>
      <Card>
        <form className='sign-up__form'>
          <h1 className='sign-up__heading'>Sign Up</h1>

          <Field
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
            placeholder='Email Address'
            type='email'
            value={form.email.value}
            touched={form.email.touched}
            valid={isEmailValid}
            errors={['Email is not valid']}
          />

          <Password
            onBlur={handlePasswordBlur}
            onChange={handlePasswordChange}
            placeholder='Password'
            type='password'
            value={form.password.value}
            touched={form.password.touched}
          />

          <Field
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
