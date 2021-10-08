import { ReactElement, ReactNode } from 'react'
import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form'

type FormProps<FormValues> = {
  useFormMethods: UseFormReturn<FormValues>
  children: ReactNode
  onSubmit: SubmitHandler<FormValues>
}

export function Form<FormValues>({
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
