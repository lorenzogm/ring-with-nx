import { Box } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import LayoutCheckout from 'components/layouts/LayoutCheckout/LayoutCheckout'
import { ReactElement } from 'react'
import type { Config } from 'types/config'

type CheckoutSuccessTemplateProps = {
  config: Config
  orderId: string
}

export function StoreCheckoutSuccessTemplate({
  config,
  orderId,
}: CheckoutSuccessTemplateProps): ReactElement {
  return (
    <LayoutCheckout config={config} activeStep={3}>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" paragraph>
          ¡Muchas gracias por tu pedido!
        </Typography>
        <Typography>
          Tu pedido con número{' '}
          <Box fontWeight="fontWeightBold" display="inline">
            {orderId}
          </Box>
          se ha completado con éxito.
        </Typography>
        <Typography paragraph>
          Recibirás un correo electrónico con la confirmación y los detalles
          para efectuar el pago.
        </Typography>
      </Grid>
    </LayoutCheckout>
  )
}
