import { className as cn } from 'lib/className'
import { prepend } from 'lib/Data/Array'
import React from 'react'
import './Select.scss'

type Props<T extends string> = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: Array<{
    label: string
    value: T
  }>
  hiddenLabel: string
}

export function Select<T extends string>({ options, hiddenLabel, className, ...props }: Props<T>) {
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
