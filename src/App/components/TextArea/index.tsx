import { FieldProps } from 'App/hooks/useForm'
import { className } from 'lib/className'
import { ChangeEventHandler } from 'react'
import './Textarea.scss'
import { Error } from 'App/components/Error'

type Props = React.InputHTMLAttributes<HTMLTextAreaElement>

export const TextArea: React.FC<Props> = props => {
  const classNames = className([props.className, 'app-textarea'])

  return <textarea {...props} className={classNames} />
}

type TextAreaFieldProps = Props & FieldProps<string>

export const TextAreaField: React.FC<TextAreaFieldProps> = props => {
  const { errors, handleBlur, handleChange, touched, value, ...inputProps } = props

  const classNames = className([
    props.className,
    errors !== undefined && touched ? 'app-textarea--invalid' : null,
  ])

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = event => {
    handleChange(event.currentTarget.value)
  }

  return (
    <div className='app-field'>
      <TextArea
        {...inputProps}
        className={classNames}
        onBlur={handleBlur}
        onChange={onChange}
        value={value}
      />
      {props.errors && props.errors.map((error, key) => <Error key={key}>{error.message}</Error>)}
    </div>
  )
}
