import { ReactElement } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Controller, useFormContext } from 'react-hook-form'

type FormInputRadioProps = {
  name: string
  label: string
  options: { label: string; value: string }[]
  required?: boolean
}

export default function FormInputRadio({
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
