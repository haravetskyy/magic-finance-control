import React from 'react'
import './Select.scss'
import { className as cn } from 'lib/className'

const prepend = (e, arr) => [e, ...arr]

export const Select = ({ options, hiddenLabel, className, ...props }) => {
  const placeholder = (
    <option hidden key={-1}>
      {hiddenLabel}
    </option>
  )

  const classNames = cn([className, 'app-select'])

  const children = options.map(({ label, value }, key) => (
    <option value={value} key={key}>
      {label}
    </option>
  ))

  return (
    <select className={classNames} {...props}>
      {prepend(placeholder, children)}
    </select>
  )
}
