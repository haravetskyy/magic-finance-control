import { CommonProps } from 'App/components/types'

export type CommonInputProps<T> = CommonProps & {
  onBlur: () => void
  onChange: (value: T) => void
  placeholder?: string
  value: T | null
}
