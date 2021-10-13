import { Box, BoxHeader, Typography } from '@ring/ui'
import { styled } from '@ring/ui/theme'
import { ReactElement } from 'react'
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'

const STORE_SHIPPING_FREE_AMOUNT = 6000
const STORE_SHIPPING_COSTS = 900
const CURRENCY = 'EUR'

export function StoreOrderSummary(): ReactElement {
  const { totalPrice } = useShoppingCart()

  const subtotal = totalPrice
  const shipping =
    totalPrice >= STORE_SHIPPING_FREE_AMOUNT ? 0 : STORE_SHIPPING_COSTS
  const total = subtotal + shipping

  return (
    <>
      <BoxHeader>Resumen</BoxHeader>
      <Box mb={2}>
        <Row>
          <Typography>Subtotal</Typography>
          <Typography>
            {formatCurrencyString({
              value: subtotal,
              currency: CURRENCY,
            })}
          </Typography>
        </Row>
        <Row>
          <Typography>Envío</Typography>
          <Typography>
            {shipping === 0
              ? 'Gratis'
              : formatCurrencyString({
                  value: shipping,
                  currency: CURRENCY,
                })}
          </Typography>
        </Row>
        <Row>
          <Typography variant="h5">
            Total <Typography variant="caption">(IVA incluido)</Typography>
          </Typography>
          <Typography variant="h5">
            {formatCurrencyString({
              value: total,
              currency: CURRENCY,
            })}
          </Typography>
        </Row>
      </Box>
    </>
  )
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`
