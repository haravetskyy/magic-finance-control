import React from 'react'
import { Field } from 'App/components/Field'

export const Password = props => {
  const isLengthValid = props.value.length >= 6 && props.value.length <= 24
  const lengthErrorMessage = 'Password length must be between 6 and 24 characters!'

  const hasOneCapitalLetter = /[A-Z]/.test(props.value)
  const capitalLetterErrorMessage = 'Password must have at least one capital letter'

  const hasOneDigit = /[0-9]/.test(props.value)
  const digitErrorMessage = 'Pasword must have at least one digit'

  const hasOneSmallLetter = /[a-z]/.test(props.value)
  const smallLetterErrorMessage = 'Pasword must have at least one small letter'

  const isPasswordValid = isLengthValid && hasOneCapitalLetter && hasOneDigit && hasOneSmallLetter

  const errors = [
    isLengthValid ? null : lengthErrorMessage,
    hasOneCapitalLetter ? null : capitalLetterErrorMessage,
    hasOneDigit ? null : digitErrorMessage,
    hasOneSmallLetter ? null : smallLetterErrorMessage,
  ].filter(error => error !== null)

  return <Field {...props} errors={errors} valid={isPasswordValid} />
}
