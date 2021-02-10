import { FC } from 'react'

import { Config } from 'services/CMS/config'
import PageLayoutCheckout from 'components/foundations/PageLayoutCheckout/PageLayoutCheckout'
import Form from 'components/foundations/Form/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormInputText from 'components/foundations/FormInputText/FormInputText'
import Button from 'components/foundations/Button/Button'
import type { Address } from 'services/api/user/address/address'
import { CheckoutAddressFormValues } from './CheckoutAddressTemplate.d'

type CheckoutAddressTemplateProps = {
  config: Config
  address: Address
  onSubmit: SubmitHandler<CheckoutAddressFormValues>
}

const CheckoutAddressTemplate: FC<CheckoutAddressTemplateProps> = ({
  config,
  address,
  onSubmit,
}) => {
  const useFormMethods = useForm<CheckoutAddressFormValues>({
    defaultValues: {
      address: {
        firstName: address.firstName,
        lastName: address.lastName,
        address: address.address,
        addressMoreInfo: address.addressMoreInfo,
        postalCode: address.postalCode,
        city: address.city,
        country: address.country,
      },
    },
  })

  return (
    <PageLayoutCheckout config={config} checkoutStep="ADDRESS">
      <Form<CheckoutAddressFormValues>
        useFormMethods={useFormMethods}
        onSubmit={onSubmit}
      >
        <FormInputText name="address.firstName" label="Nombre" required />
        <FormInputText name="address.lastName" label="Apellidos" required />
        <FormInputText name="address.address" label="Dirección" required />
        <FormInputText name="address.addressMoreInfo" label="Más información" />
        <FormInputText
          name="address.postalCode"
          label="Código postal"
          required
        />
        <FormInputText name="address.city" label="Población" required />
        <FormInputText name="address.country" label="País" required disabled />

        <Button type="submit" variant="primary">
          Guardar dirección
        </Button>
      </Form>
    </PageLayoutCheckout>
  )
}

export default CheckoutAddressTemplate
