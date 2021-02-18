import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'

import LayoutCheckout from 'components/layouts/LayoutCheckout/LayoutCheckout'
import Form from 'components/atoms/Form'
import FormInputText from 'components/atoms/FormInputText'
import type { Address } from 'types/address'
import type { Config } from 'types/config'

export type CheckoutAddressFormValues = {
  address: Address
}

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
    <LayoutCheckout config={config} activeStep={0}>
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

        <Button type="submit" variant="contained">
          Guardar dirección
        </Button>
      </Form>
    </LayoutCheckout>
  )
}

export default CheckoutAddressTemplate
