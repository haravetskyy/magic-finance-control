/**
 * NonNegativeNumber
 */
interface NonNegativeNumberBrand {
  readonly NonNegativeNumber: unique symbol
}

export type NonNegativeNumber = number & NonNegativeNumberBrand

export const isNonNegativeNumber = (n: number): n is NonNegativeNumber => n >= 0

/**
 * NonZeroNumber
 */
interface NonZeroNumberBrand {
  readonly NonZeroNumberBrand: unique symbol
}

export type NonZeroNumber = number & NonZeroNumberBrand

export const isNonZeroNumber = (n: number): n is NonZeroNumber => n !== 0
