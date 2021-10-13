import {
  LayoutCheckout,
  StoreOrderSummary,
  StorePaymentMethods,
} from '@ring/store'
import {
  BoxHeader,
  Button,
  Form,
  FormInputRadio,
  Grid,
  IconArrowForward,
  Typography,
} from '@ring/ui'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type StoreCheckoutPaymentTemplateProps = {
  onSubmit: SubmitHandler<StoreCheckoutPaymentFormValues>
}

export function StoreCheckoutPaymentTemplate({
  onSubmit,
}: StoreCheckoutPaymentTemplateProps): ReactElement {
  const useFormMethods = useForm<StoreCheckoutPaymentFormValues>({
    defaultValues: { paymentMethod: 'WIRE_TRANSFER' },
  })

  const { paymentMethod } = useFormMethods.watch()

  return (
    <LayoutCheckout activeStep={1}>
      <Form<StoreCheckoutPaymentFormValues>
        useFormMethods={useFormMethods}
        onSubmit={onSubmit}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
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
          <Grid item xs={12} md={4}>
            <StoreOrderSummary />
            <Button
              type="submit"
              disabled={!paymentMethod}
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

export type StoreCheckoutPaymentFormValues = {
  paymentMethod: StorePaymentMethods
}
