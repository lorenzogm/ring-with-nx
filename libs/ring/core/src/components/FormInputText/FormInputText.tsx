import TextField from '@material-ui/core/TextField'
import { ReactElement } from 'react'
import { RegisterOptions, useController, useFormContext } from 'react-hook-form'

export type FormInputTextProps = {
  name: string
  label: string
  placeholder?: string
  disabled?: boolean
  required?: RegisterOptions['required']
  validate?: RegisterOptions['validate']
  pattern?: RegisterOptions['pattern']
}
export function FormInputText({
  name,
  label,
  pattern,
  placeholder,
  required,
  validate,
  disabled = false,
}: FormInputTextProps): ReactElement {
  const { control } = useFormContext()
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: {
      required: required ? 'Requerido' : undefined,
      validate,
      pattern,
    },
  })

  return (
    <TextField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...inputProps}
      disabled={disabled}
      inputRef={ref}
      label={required ? `${label} *` : `${label} (Opcional)`}
      placeholder={placeholder}
      variant="filled"
      fullWidth
    />
  )
}
