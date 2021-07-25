import { Button } from 'App/components/Button'
import { InputField } from 'App/components/InputField'
import { useForm } from 'App/hooks/useForm'
import { createUser, signIn } from 'lib/auth'
import { of } from 'lib/Data'
import { fromPredicate } from 'lib/Form'
import { sequence, validationError, validators } from 'lib/Form/Validation'
import { Link } from 'react-router-dom'
import './AuthForm.scss'

export const SignUpForm = () => {
  const { fieldProps, handleSubmit } = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: createUser,
    validationStrategy: 'onChange',
    validators: values => ({
      email: validators.email,
      password: sequence(
        validators.minLength(6),
        validators.maxLength(24),
        fromPredicate({
          predicate: v => /[A-Z]/.test(v),
          onFailure: () => of(validationError('Password must have at least one capital letter!')),
        }),
        fromPredicate({
          predicate: v => /[0-9]/.test(v),
          onFailure: () => of(validationError('Password must have at least one digit!')),
        }),
        fromPredicate({
          predicate: v => /[a-z]/.test(v),
          onFailure: () => of(validationError('Password must have at least one small letter!')),
        }),
      ),
      confirmPassword: fromPredicate({
        predicate: v => v === values.password,
        onFailure: () => of(validationError('Passwords do not match!')),
      }),
    }),
  })

  return (
    <div className='auth-form__container'>
      <div className='auth-form__wrapper'>
        <form className='auth-form__form'>
          <div className='auth-form__mobile-wrapper'>
            <h1 className='auth-form__heading'>Sign Up</h1>

            <InputField {...fieldProps('email')} placeholder='Email Address' type='email' />

            <InputField {...fieldProps('password')} placeholder='Password' type='password' />

            <InputField
              {...fieldProps('confirmPassword')}
              placeholder='Confirm password'
              type='password'
            />
          </div>

          <div className='auth-form__mobile-wrapper'>
            <Button type='submit' variant='success' onClick={handleSubmit}>
              Submit
            </Button>

            <Link to='/sign-in' className='auth-form__redirection-text'>
              I already have account
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export const SignInForm = () => {
  const { fieldProps, handleSubmit } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validators: () => ({
      email: validators.nonBlankString(),
      password: validators.nonBlankString(),
    }),
    validationStrategy: 'onBlur',
    onSubmit: ({ email, password }) => signIn(email, password),
  })

  return (
    <div className='auth-form__container'>
      <div className='auth-form__wrapper'>
        <form className='auth-form__form'>
          <div className='auth-form__mobile-wrapper'>
            <h1 className='auth-form__heading'>Sign in</h1>

            <InputField {...fieldProps('email')} placeholder='Email Address' type='email' />

            <InputField {...fieldProps('password')} placeholder='Password' type='password' />
          </div>

          <div className='auth-form__mobile-wrapper'>
            <Button type='submit' variant='success' onClick={handleSubmit}>
              Submit
            </Button>

            <Link to='/sign-up' className='auth-form__redirection-text'>
              I don`t have account
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
