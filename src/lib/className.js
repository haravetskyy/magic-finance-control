export const className = classNames =>
  classNames
    .filter(className => typeof className === 'string')
    .map(className => className.trim())
    .join(' ')
