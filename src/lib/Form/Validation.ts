import { isNonEmpty, NonEmptyArray, of } from 'lib/Data/Array'
import {
  isNonNegativeNumber,
  isNonZeroNumber,
  NonNegativeNumber,
  NonZeroNumber,
} from 'lib/Data/Number'
import { UnknownRecord } from 'lib/Data/Record'
import { Email, isEmail, isNonBlankString, NonBlankString } from 'lib/Data/String'
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

export type Validator<I, O> = (input: I) => ValidationResult<O>

export function sequence<I, A, O>(
  a: Validator<I, A>,
  b: Validator<A, O>,
): (input: I) => ValidationResult<O>

export function sequence<I, A, B, O>(
  a: Validator<I, A>,
  b: Validator<A, B>,
  c: Validator<B, O>,
): (input: I) => ValidationResult<O>

export function sequence<I, A, B, C, O>(
  a: Validator<I, A>,
  b: Validator<A, B>,
  c: Validator<B, C>,
  d: Validator<C, O>,
): (input: I) => ValidationResult<O>

export function sequence<I, A, B, C, D, O>(
  a: Validator<I, A>,
  b: Validator<A, B>,
  c: Validator<B, C>,
  d: Validator<C, D>,
  e: Validator<D, O>,
): (input: I) => ValidationResult<O>

export function sequence<I, A, B, C, D, E, O>(
  a: Validator<I, A>,
  b: Validator<A, B>,
  c: Validator<B, C>,
  d: Validator<C, D>,
  e: Validator<D, E>,
  f: Validator<E, O>,
): (input: I) => ValidationResult<O>

export function sequence<I>(
  ...validators: NonEmptyArray<Validator<I, unknown>>
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

export type ValidationSchema<Input extends UnknownRecord> = Partial<
  {
    [K in keyof Input]: Validator<Input[K], unknown>
  }
>

export type ValidatedValues<Input extends UnknownRecord, Schema extends ValidationSchema<Input>> = {
  [K in keyof Input]: Schema[K] extends Validator<Input[K], infer Output>
    ? Output
    : Schema[K] extends Validator<Input[K], infer Output> | undefined
    ? Output | Input[K]
    : Input[K]
}

export type ValidationSchemaResult<T extends UnknownRecord> = Result<
  T,
  Partial<Record<keyof T, NonEmptyArray<ValidationError>>>
>

export function validate<Input extends UnknownRecord, Validators extends ValidationSchema<Input>>(
  validation: (values: Input) => Validators,
): (input: Input) => ValidationSchemaResult<ValidatedValues<Input, Validators>> {
  return input => {
    const validationSchema = validation(input)
    const failures: Partial<Record<keyof Input, NonEmptyArray<ValidationError>>> = {}

    for (const key in input) {
      const validator = validationSchema[key]

      if (validator) {
        const result = validator(input[key])

        if (isFailure(result)) {
          failures[key] = result.data
        }
      }
    }

    return Object.keys(failures).length === 0
      ? success(input as ValidatedValues<Input, Validators>)
      : failure(failures)
  }
}

/**
 * Validators
 */
const successValidator = <T>(): Validator<T, T> =>
  fromPredicate({
    predicate: () => true,
    onFailure: () => of(validationError('This can never happen!')),
  })

const email = <T extends string>(): Validator<T, Email> =>
  fromPredicate({
    predicate: isEmail,
    onFailure: () => of(validationError('Invalid e-mail!')),
  })

const minLength = <T extends string>(min: number): Validator<T, T> =>
  fromPredicate({
    predicate: i => i.length >= min,
    onFailure: () => of(validationError(`Input length cannot be smaller than ${min} characters!`)),
  })

const maxLength = <T extends string>(max: number): Validator<T, T> =>
  fromPredicate({
    predicate: i => i.length < max,
    onFailure: () => of(validationError(`Input length cannot be smaller than ${max} characters!`)),
  })

const nonBlankString = <T extends string>(): Validator<T, NonBlankString> =>
  fromPredicate({
    predicate: isNonBlankString,
    onFailure: () => of(validationError('Input cannot be a blank string!')),
  })

const nonNegativeNumber = <T extends number>(): Validator<T, NonNegativeNumber> =>
  fromPredicate({
    predicate: isNonNegativeNumber,
    onFailure: () => of(validationError('Input cannot be a negative number!')),
  })

const nonZeroNumber = <T extends number>(): Validator<T, NonZeroNumber> =>
  fromPredicate({
    predicate: isNonZeroNumber,
    onFailure: () => of(validationError('Input cannot be equal to 0!')),
  })

export const validators = {
  email,
  maxLength,
  minLength,
  nonBlankString,
  nonNegativeNumber,
  nonZeroNumber,
  success: successValidator,
}
