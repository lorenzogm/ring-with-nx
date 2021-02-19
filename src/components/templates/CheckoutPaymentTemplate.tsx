import { FC } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconArrowForward from '@material-ui/icons/ArrowForward'

import LayoutCheckout from 'components/layouts/LayoutCheckout/LayoutCheckout'
import type { PaymentMethods } from 'types/paymentMethods'
import type { Config } from 'types/config'

type CheckoutPaymentTemplateProps = {
  config: Config
  onSelect: ({ paymentMethod }: { paymentMethod: PaymentMethods }) => void
}

const CheckoutPaymentTemplate: FC<CheckoutPaymentTemplateProps> = ({
  config,
  onSelect,
}) => {
  return (
    <LayoutCheckout config={config} activeStep={1}>
      <Grid container justify="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={onSelectWireTransfer}
            endIcon={<IconArrowForward />}
          >
            <a>Transferencia bancaria</a>
          </Button>
        </Grid>
      </Grid>
    </LayoutCheckout>
  )

  function onSelectWireTransfer() {
    onSelect({ paymentMethod: 'WIRE_TRANSFER' })
  }
}

export default CheckoutPaymentTemplate
