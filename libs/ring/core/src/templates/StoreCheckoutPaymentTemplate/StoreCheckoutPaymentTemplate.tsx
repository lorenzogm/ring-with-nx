import { ReactElement } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconArrowForward from '@material-ui/icons/ArrowForward'
import Typography from '@material-ui/core/Typography'
import { SubmitHandler, useForm } from 'react-hook-form'

import LayoutCheckout from 'components/layouts/LayoutCheckout/LayoutCheckout'
import type { PaymentMethods } from 'types/paymentMethods'
import type { Config } from 'types/config'
import FormInputRadio from '@ring/components/FormInputRadio'
import Form from '@ring/components/Form'
import BoxHeader from '@ring/components/BoxHeader'
import OrderSummary from 'components/modules/OrderSummary'

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
            <OrderSummary config={config} />
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
