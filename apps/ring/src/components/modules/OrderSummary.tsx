import Grid from '@material-ui/core/Grid'
import { ReactElement } from 'react'
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import BoxHeader from '@ring/components/BoxHeader'
import { Config } from 'types/config'

type OrderSummaryProps = {
  config: Config
}

export default function OrderSummary({
  config,
}: OrderSummaryProps): ReactElement {
  const { totalPrice } = useShoppingCart()

  const subtotal = totalPrice
  const shipping =
    totalPrice >= config.shipping.freeAmount ? 0 : config.shipping.costs
  const total = subtotal + shipping

  return (
    <>
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
            Total <Typography variant="caption">(IVA incluido)</Typography>
          </Typography>
          <Typography variant="h5" component="p">
            {formatCurrencyString({
              value: total,
              currency: config.currency,
            })}
          </Typography>
        </Grid>
      </Box>
    </>
  )
}
