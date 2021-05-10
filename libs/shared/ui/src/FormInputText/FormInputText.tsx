import { FC } from 'react'
import { useFormContext, useController } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'

type FormInputTextProps = {
  name: string
  label: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  validate?: Record<string, (value: string) => boolean | string>
}
const FormInputText: FC<FormInputTextProps> = ({
  name,
  label,
  placeholder,
  required,
  validate,
  disabled = false,
}) => {
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
      label={label}
      placeholder={placeholder}
      variant="filled"
      fullWidth
    />
  )
}

export default FormInputText
