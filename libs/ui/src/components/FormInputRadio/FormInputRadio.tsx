import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { ReactElement } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type FormInputRadioProps = {
  name: string
  label: string
  options: { label: string; value: string }[]
  required?: boolean
}

export function FormInputRadio({
  name,
  label,
  options,
  required,
}: FormInputRadioProps): ReactElement {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? 'Requerido' : undefined,
      }}
      render={() => (
        <RadioGroup aria-label={label}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio color="primary" />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      )}
    />
  )
}
