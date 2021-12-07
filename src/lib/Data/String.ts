import isEmailValidator from 'validator/es/lib/isEmail'

/**
 * NonEmptyString
 */
interface NonEmptyStringBrand {
  readonly NonEmptyStringBrand: unique symbol
}

export type NonEmptyString = string & NonEmptyStringBrand

export const isNonEmptyString = (s: string): s is NonEmptyString => s !== ''

/**
 * NonBlankString
 */
interface NonBlankStringBrand {
  readonly NonBlankStringBrand: unique symbol
}

export type NonBlankString = string & NonEmptyString & NonBlankStringBrand

export const isNonBlankString = (s: string): s is NonBlankString => s.trim() !== ''

/**
 * Email
 */
interface EmailBrand {
  readonly EmailBrand: unique symbol
}

export type Email = string & EmailBrand

export const isEmail = (s: string): s is Email => isEmailValidator(s)
