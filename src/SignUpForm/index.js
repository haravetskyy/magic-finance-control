import React from 'react'

import isEmail from 'validator/es/lib/isEmail'

import './SignUpForm.scss'

const className = classNames =>
  classNames.filter(className => typeof className === 'string').join(' ')

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
    errors: 0,
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

  const isEmailInvalid = !isEmail(form.email.value) && form.email.touched

  const emailClassNames = className([
    'sign-up__input',
    isEmailInvalid ? 'sign-up__input--wrong' : null,
  ])

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

  const isPasswordInvalid = !passwordRegExp.test(form.password.value) && form.password.touched

  const passwordClassNames = className([
    'sign-up__input',
    isPasswordInvalid ? 'sign-up__input--wrong' : null,
  ])

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

  const isConfirmPasswordInvalid =
    form.password.value !== form.confirmPassword.value && form.confirmPassword.touched

  const confirmPasswordClassNames = className([
    'sign-up__input',
    isConfirmPasswordInvalid ? 'sign-up__input--wrong' : null,
  ])

  return (
    <div className='sign-up__container'>
      <form className='sign-up__form'>
        <h1 className='sign-up__heading'>Sign Up</h1>

        <input
          className={emailClassNames}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          value={form.email.value}
          type='email'
          placeholder='Email Address'
        />

        {isEmailInvalid ? <span className='sign-up__error'>Email is not valid</span> : null}

        <input
          className={passwordClassNames}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          value={form.password.value}
          type='password'
          placeholder='Password'
        />

        {isPasswordInvalid ? (
          <span className='sign-up__error'>Password is not strong enough</span>
        ) : null}

        <input
          className={confirmPasswordClassNames}
          onChange={handleConfirmPasswordChange}
          onBlur={handleConfirmPasswordBlur}
          value={form.confirmPassword.value}
          type='password'
          placeholder='Confirm password'
        />

        {isConfirmPasswordInvalid ? (
          <span className='sign-up__error'>Passwords do not match</span>
        ) : null}

        <button className='sign-up__submit' type='submit'>
          <p className='sign-up__submit-text'>Submit</p>
        </button>
      </form>
    </div>
  )
}
