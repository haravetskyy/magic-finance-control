import { Button } from 'App/components/Button'
import { Card } from 'App/components/Card'
import { InputField } from 'App/components/InputField'
import { useState } from 'react'
import { signIn } from 'lib/auth'
import './SignInForm.scss'

const isNonEmpty = (str: string) => str.length !== 0

export const SignInForm = () => {
  const [form, setForm] = useState({
    email: {
      value: '',
      touched: false,
    },
    password: {
      value: '',
      touched: false,
    },
  })

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = e =>
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

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = e =>
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

  const isEmailValid = isNonEmpty(form.email.value)
  const isPasswordValid = isNonEmpty(form.password.value)

  const isFormValid = isEmailValid && isPasswordValid

  const handleSubmit = (e: React.SyntheticEvent): void => {
    if (isFormValid) {
      signIn(form.email.value, form.password.value).then(console.log)
    }

    e.preventDefault()
  }

  return (
    <div className='sign-in__container'>
      <Card>
        <form className='sign-in__form'>
          <h1 className='sign-in__heading'>Sign in</h1>

          <InputField
            errors={['This field is required!']}
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
            placeholder='Email Address'
            touched={form.email.touched}
            type='email'
            valid={isEmailValid}
            value={form.email.value}
          />

          <InputField
            errors={['This field is required!']}
            onBlur={handlePasswordBlur}
            onChange={handlePasswordChange}
            placeholder='Password'
            touched={form.password.touched}
            type='password'
            valid={isPasswordValid}
            value={form.password.value}
          />

          <Button variant='success' onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </Card>
    </div>
  )
}
