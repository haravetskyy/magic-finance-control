import { prepend } from 'lib/array'
import { className as cn } from 'lib/className'
import React from 'react'
import './Select.scss'

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: Array<{
    label: string
    value: string
  }>
  hiddenLabel: string
}

export const Select: React.FC<Props> = ({ options, hiddenLabel, className, ...props }) => {
  const placeholder = (
    <option hidden key='hidden-label'>
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
      {prepend(children, placeholder)}
    </select>
  )
}
