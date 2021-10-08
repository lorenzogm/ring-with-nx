import TextField from '@material-ui/core/TextField'
import { ReactElement } from 'react'
import { useController, useFormContext } from 'react-hook-form'

type FormInputTextProps = {
  name: string
  label: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  validate?: Record<string, (value: string) => boolean | string>
}
export function FormInputText({
  name,
  label,
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
