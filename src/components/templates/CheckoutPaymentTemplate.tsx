import { ReactElement } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconArrowForward from '@material-ui/icons/ArrowForward'
import Typography from '@material-ui/core/Typography'
import { SubmitHandler, useForm } from 'react-hook-form'
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'
import Box from '@material-ui/core/Box'

import LayoutCheckout from 'components/layouts/LayoutCheckout/LayoutCheckout'
import type { PaymentMethods } from 'types/paymentMethods'
import type { Config } from 'types/config'
import FormInputRadio from 'components/atoms/FormInputRadio'
import Form from 'components/atoms/Form'
import BoxHeader from 'components/atoms/BoxHeader'

type CheckoutPaymentTemplateProps = {
  config: Config
  onSubmit: SubmitHandler<CheckoutPaymentFormValues>
}

export default function CheckoutPaymentTemplate({
  config,
  onSubmit,
}: CheckoutPaymentTemplateProps): ReactElement {
  const useFormMethods = useForm<CheckoutPaymentFormValues>({
    defaultValues: { paymentMethod: 'WIRE_TRANSFER' },
  })
  const { totalPrice } = useShoppingCart()

  const subtotal = totalPrice
  const shipping =
    totalPrice >= config.shipping.freeAmount ? 0 : config.shipping.costs
  const total = subtotal + shipping

  const { paymentMethod } = useFormMethods.watch()

  return (
    <LayoutCheckout config={config} activeStep={1}>
      <Form<CheckoutPaymentFormValues>
        useFormMethods={useFormMethods}
        onSubmit={onSubmit}
      >
        <Grid container justify="center" spacing={4}>
          <Grid item xs={10} md={6}>
            <BoxHeader>Forma de pago</BoxHeader>
            <FormInputRadio
              name="paymentMethod"
              label="Forma de pago"
              options={[
                { label: 'Transferencia bancaria', value: 'WIRE_TRANSFER' },
              ]}
              required
            />
            {paymentMethod === 'WIRE_TRANSFER' && (
              <Typography>
                Recibirás un email con información para realizar el pago.
              </Typography>
            )}
          </Grid>
          <Grid item xs={10} md={4}>
            <BoxHeader>Resumen</BoxHeader>
            <Box mb={2}>
              <Grid container justify="space-between">
                <Typography>Subtotal</Typography>
                <Typography>
                  {formatCurrencyString({
                    value: subtotal,
                    currency: config.currency,
                  })}
                </Typography>
              </Grid>
              <Grid container justify="space-between">
                <Typography>Envío</Typography>
                <Typography>
                  {shipping === 0
                    ? 'Gratis'
                    : formatCurrencyString({
                        value: shipping,
                        currency: config.currency,
                      })}
                </Typography>
              </Grid>
              <Grid container justify="space-between">
                <Typography variant="h5" component="p">
                  Total{' '}
                  <Typography variant="caption">(IVA incluido)</Typography>
                </Typography>
                <Typography variant="h5" component="p">
                  {formatCurrencyString({
                    value: total,
                    currency: config.currency,
                  })}
                </Typography>
              </Grid>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<IconArrowForward />}
              fullWidth
            >
              <a>Siguiente</a>
            </Button>
            <Typography variant="caption">
              Podrás comprobar tus datos antes de finalizar el pedido
            </Typography>
          </Grid>
        </Grid>
      </Form>
    </LayoutCheckout>
  )
}

export type CheckoutPaymentFormValues = {
  paymentMethod: PaymentMethods
}
