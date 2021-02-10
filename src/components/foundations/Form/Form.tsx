import React, { ReactElement, ReactNode } from 'react'
import { FormProvider, SubmitHandler, UseFormMethods } from 'react-hook-form'

type FormProps<FormValues> = {
  useFormMethods: UseFormMethods<FormValues>
  children: ReactNode
  onSubmit: SubmitHandler<FormValues>
}

export default function Form<FormValues>({
  useFormMethods,
  children,
  onSubmit,
}: FormProps<FormValues>): ReactElement {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...useFormMethods}>
      <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}
