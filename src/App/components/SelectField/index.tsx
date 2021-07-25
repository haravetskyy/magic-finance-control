import { Error } from 'App/components/Error'
import { Select } from 'App/components/Select'
import { FieldProps } from 'App/hooks/useForm'
import { className } from 'lib/className'
import { ChangeEventHandler, ComponentProps } from 'react'

type Props<T extends string> = ComponentProps<typeof Select> & FieldProps<T>

export function SelectField<T extends string>(props: Props<T>) {
  const { errors, handleBlur, handleChange, touched, value, ...selectProps } = props

  const classNames = className([
    props.className,
    errors !== undefined && touched ? 'app-select--invalid' : null,
  ])

  const onChange: ChangeEventHandler<HTMLSelectElement> = event => {
    handleChange(event.currentTarget.value as T)
  }

  return (
    <div className='app-field'>
      <Select
        {...selectProps}
        className={classNames}
        onBlur={handleBlur}
        onChange={onChange}
        value={value}
      />
      {props.errors && props.errors.map((error, key) => <Error key={key}>{error.message}</Error>)}
    </div>
  )
}
