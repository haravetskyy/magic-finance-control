const isString = (s: unknown): s is string => typeof s === 'string'

export const className = (classNames: Array<string | null | undefined>) =>
  classNames
    .filter(isString)
    .map(className => className.trim())
    .join(' ')
