import { Box } from '@material-ui/core'
import { Grid, Typography } from '@ring/ui'
import { ReactElement } from 'react'

type CheckoutSuccessTemplateProps = {
  orderId: string
}

export function StoreCheckoutSuccessTemplate({
  orderId,
}: CheckoutSuccessTemplateProps): ReactElement {
  return (
    <Grid container direction="column" alignItems="center">
      <Typography variant="h4" paragraph>
        ¡Muchas gracias por tu pedido!
      </Typography>
      <Typography>
        Tu pedido con número
        <Box fontWeight="fontWeightBold" display="inline">
          {` ${orderId} `}
        </Box>
        se ha completado con éxito.
      </Typography>
      <Typography paragraph>
        Recibirás un correo electrónico con la confirmación y los detalles para
        efectuar el pago.
      </Typography>
    </Grid>
  )
}
