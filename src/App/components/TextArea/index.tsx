import { Error } from 'App/components/Error'
import { CommonProps } from 'App/components/types'
import { FieldProps } from 'App/hooks/useForm'
import { className } from 'lib/className'
import { ChangeEventHandler } from 'react'
import './Textarea.scss'

type TextAreaProps = CommonProps & {
  onBlur: () => void
  onChange: (value: string) => void
  placeholder?: string
  value: string
  cols?: number
  rows?: number
}

export function TextArea(props: TextAreaProps) {
  const classNames = className([props.className, 'app-textarea'])

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = event => {
    props.onChange(event.currentTarget.value)
  }

  return <textarea {...props} className={classNames} onChange={handleChange} value={props.value} />
}

type TextAreaFieldProps = TextAreaProps & FieldProps<string>

export function TextAreaField(props: TextAreaFieldProps) {
  const { errors, touched, ...textAreaProps } = props

  const classNames = className([
    props.className,
    errors !== undefined && touched ? 'app-textarea--invalid' : null,
  ])

  return (
    <div className='app-field'>
      <TextArea className={classNames} {...textAreaProps} />
      {errors && errors.map((error, key) => <Error key={key}>{error.message}</Error>)}
    </div>
  )
}
