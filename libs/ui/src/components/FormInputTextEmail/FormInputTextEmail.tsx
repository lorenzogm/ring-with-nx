import { ReactElement } from 'react'

import { FormInputText, FormInputTextProps } from '..'

type FormInputTextEmailProps = FormInputTextProps
export function FormInputTextEmail({
  ...props
}: FormInputTextEmailProps): ReactElement {
  return (
    <FormInputText
      pattern={{
        value: /\S+@\S+\.\S+/,
        message: 'Entered value does not match email format',
      }}
      {...props}
    />
  );
}
