import { FC } from 'react'

import { Config } from 'services/CMS/config'
import PageLayoutCheckout from 'components/foundations/PageLayoutCheckout/PageLayoutCheckout'
import Form from 'components/foundations/Form/Form'
import { useForm } from 'react-hook-form'
import FormInputText from 'components/foundations/FormInputText/FormInputText'
import Button from 'components/foundations/Button/Button'

type CheckoutAddressTemplateProps = {
  config: Config
  onSubmit: (values: Record<string, string>) => void
}

const CheckoutAddressTemplate: FC<CheckoutAddressTemplateProps> = ({
  config,
  onSubmit,
}) => {
  const useFormMethods = useForm({
    defaultValues: {
      country: 'España',
    },
  })

  return (
    <PageLayoutCheckout config={config} checkoutStep="ADDRESS">
      <Form useFormMethods={useFormMethods} onSubmit={onSubmit}>
        <FormInputText name="firstName" label="Nombre" required />
        <FormInputText name="lastNAme" label="Apellidos" required />
        <FormInputText name="address" label="Dirección" required />
        <FormInputText name="addressMoreInfo" label="Más información" />
        <FormInputText name="postalCode" label="Código postal" required />
        <FormInputText name="city" label="Población" required />
        <FormInputText name="country" label="País" required disabled />

        <Button type="submit" variant="primary">
          Guardar dirección
        </Button>
      </Form>
    </PageLayoutCheckout>
  )
}

export default CheckoutAddressTemplate
