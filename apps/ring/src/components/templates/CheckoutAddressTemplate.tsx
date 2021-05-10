import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconArrowForward from '@material-ui/icons/ArrowForward'

import LayoutCheckout from 'components/layouts/LayoutCheckout/LayoutCheckout'
import Form from 'components/elements/Form'
import FormInputText from 'components/elements/FormInputText'
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
        email: address.email,
        firstName: address.firstName,
        lastName: address.lastName,
        address: address.address,
        addressMoreInfo: address.addressMoreInfo,
        postcode: address.postcode,
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
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid item sm={6} style={{ width: '100%' }}>
            <FormInputText name="address.email" label="Email" required />
          </Grid>

          <Grid item sm={6} style={{ width: '100%' }}>
            <FormInputText name="address.firstName" label="Nombre" required />
          </Grid>

          <Grid item sm={6} style={{ width: '100%' }}>
            <FormInputText name="address.lastName" label="Apellidos" required />
          </Grid>

          <Grid item sm={6} style={{ width: '100%' }}>
            <FormInputText name="address.address" label="Dirección" required />
          </Grid>

          <Grid item sm={6} style={{ width: '100%' }}>
            <FormInputText
              name="address.addressMoreInfo"
              label="Más información"
            />
          </Grid>

          <Grid item sm={6} style={{ width: '100%' }}>
            <FormInputText
              name="address.postcode"
              label="Código postal"
              required
            />
          </Grid>

          <Grid item sm={6} style={{ width: '100%' }}>
            <FormInputText name="address.city" label="Población" required />
          </Grid>

          <Grid item sm={6} style={{ width: '100%' }}>
            <FormInputText
              name="address.country"
              label="País"
              required
              disabled
            />
          </Grid>

          <Grid item sm={6} style={{ width: '100%' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<IconArrowForward />}
              fullWidth
            >
              Guardar dirección
            </Button>
          </Grid>
        </Grid>
      </Form>
    </LayoutCheckout>
  )
}

export default CheckoutAddressTemplate
