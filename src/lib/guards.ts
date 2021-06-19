export const isString = (s: unknown): s is string => typeof s === 'string'

export const isNonNullable = <T>(a: T): a is NonNullable<T> => a !== null && a !== null
