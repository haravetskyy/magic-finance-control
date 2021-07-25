import { isNonEmpty, NonEmptyArray, of } from 'lib/Data/Array'
import { UnknownRecord } from 'lib/Data/Record'
import isEmail from 'validator/es/lib/isEmail'
import { failure, fromPredicate, isFailure, Result, success } from './Result'

export type ValidationError = {
  id: 'ValidationError'
  message: string
}

export const validationError = (message: string): ValidationError => ({
  id: 'ValidationError',
  message,
})

type ValidationResult<I> = Result<I, NonEmptyArray<ValidationError>>

export type Validator<I> = (input: I) => ValidationResult<I>

export function sequence<I>(a: Validator<I>, b: Validator<I>): (input: I) => ValidationResult<I>

export function sequence<I>(
  a: Validator<I>,
  b: Validator<I>,
  c: Validator<I>,
): (input: I) => ValidationResult<I>

export function sequence<I>(
  a: Validator<I>,
  b: Validator<I>,
  c: Validator<I>,
  d: Validator<I>,
): (input: I) => ValidationResult<I>

export function sequence<I>(
  a: Validator<I>,
  b: Validator<I>,
  c: Validator<I>,
  d: Validator<I>,
  e: Validator<I>,
): (input: I) => ValidationResult<I>

export function sequence<I>(
  a: Validator<I>,
  b: Validator<I>,
  c: Validator<I>,
  d: Validator<I>,
  e: Validator<I>,
  f: Validator<I>,
): (input: I) => ValidationResult<I>

export function sequence<I>(
  ...validators: NonEmptyArray<Validator<I>>
): (input: I) => ValidationResult<I> {
  return input => {
    const failures: Array<ValidationError> = []

    for (const key in validators) {
      const result = validators[key](input)

      if (isFailure(result)) {
        failures.push(...result.data)
      }
    }

    return isNonEmpty(failures) ? failure(failures) : success(input)
  }
}

export type ValidationSchema<T extends UnknownRecord> = {
  [K in keyof T]: Validator<T[K]>
}

export type ValidationSchemaResult<T extends UnknownRecord> = Result<
  T,
  Partial<Record<keyof T, NonEmptyArray<ValidationError>>>
>

export function validate<T extends UnknownRecord>(
  validation: (values: T) => Partial<ValidationSchema<T>>,
): (input: T) => ValidationSchemaResult<T> {
  return input => {
    const validationSchema = validation(input)
    const failures: Partial<Record<keyof T, NonEmptyArray<ValidationError>>> = {}

    for (const key in input) {
      const validator = validationSchema[key]

      if (validator !== undefined) {
        const result = validator(input[key])

        if (isFailure(result)) {
          failures[key] = result.data
        }
      }
    }

    return Object.keys(failures).length === 0 ? success(input) : failure(failures)
  }
}

/**
 * Validators
 */
const email: Validator<string> = fromPredicate({
  predicate: isEmail,
  onFailure: () => of(validationError('Invalid e-mail!')),
})

function minLength<T extends string>(min: number): Validator<T> {
  return fromPredicate({
    predicate: i => i.length >= min,
    onFailure: () => of(validationError(`Input length cannot be smaller than ${min} characters!`)),
  })
}

function maxLength<T extends string>(max: number): Validator<T> {
  return fromPredicate({
    predicate: i => i.length < max,
    onFailure: () => of(validationError(`Input length cannot be smaller than ${max} characters!`)),
  })
}

function nonBlankString<T extends string>(): Validator<T> {
  return fromPredicate({
    predicate: i => i.trim() !== '',
    onFailure: () => of(validationError('Input cannot be a blank string!')),
  })
}

const nonNegative: Validator<number> = fromPredicate({
  predicate: i => i >= 0,
  onFailure: () => of(validationError('Input cannot be a negative number!')),
})

export const validators = {
  email,
  maxLength,
  minLength,
  nonBlankString,
  nonNegative,
}
