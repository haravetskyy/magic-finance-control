import { Error } from 'App/components/Error'
import { Select } from 'App/components/Select'
import { FieldProps } from 'App/components/types'
import { className } from 'lib/className'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof Select> & FieldProps

export const SelectField: React.FC<Props> = ({ touched, valid, errors, ...props }) => {
  const isSelectFieldInvalid = !valid && touched

  const classNames = className([
    props.className,
    isSelectFieldInvalid ? 'app-select--invalid' : null,
  ])

  const errorMessages = errors.map((error, key) => <Error key={key}>{error}</Error>)

  return (
    <div className='app-field'>
      <Select {...props} className={classNames} />
      {isSelectFieldInvalid ? errorMessages : null}
    </div>
  )
}
