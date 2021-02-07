import React, { FC } from 'react'
import { FormProvider, UseFormMethods } from 'react-hook-form'

type FormProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormMethods: UseFormMethods<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: Record<string, any>) => void
}

const Form: FC<FormProps> = ({ useFormMethods, children, onSubmit }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...useFormMethods}>
      <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}

export default Form
