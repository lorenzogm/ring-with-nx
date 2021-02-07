/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { FC } from 'react'
import { useFormContext } from 'react-hook-form'

type FormInputTextProps = {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  validate?: Record<string, (value: string) => boolean | string>
}
const FormInputText: FC<FormInputTextProps> = ({
  name,
  label,
  placeholder,
  required,
  validate,
}) => {
  const { register } = useFormContext()

  return (
    <>
      <label htmlFor={name} className="block text-gray-700">
        {label}
      </label>

      <input
        type="text"
        name={name}
        id={name}
        className="form-input mt-1 block w-full"
        placeholder={placeholder}
        ref={register({
          required: required ? 'Requerido' : undefined,
          validate,
        })}
      />
    </>
  )
}

export default FormInputText
