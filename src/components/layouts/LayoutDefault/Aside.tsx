import { ReactElement, useEffect, useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import Link from 'next/link'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import CloseIcon from '@material-ui/icons/Close'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import styled from 'styled-components'

import Button from '@material-ui/core/Button'
import CartProducts from 'components/molecules/CartProductList'
import theme from 'theme'
import { Config } from 'types/config'

export type CartStatus = 'OPEN' | 'CLOSED'

const DrawerStyled = styled(Drawer)`
  .MuiDrawer-paper {
    ${theme.breakpoints.down('sm')} {
      width: 100%;
    }

    ${theme.breakpoints.up('md')} {
      min-width: 400px;
    }
  }
`

const Body = styled.aside`
  display: flex;
  min-height: calc(100vh - 245px);
  flex-direction: column;
  margin-bottom: ${theme.spacing(6)}px;
`

type AsideProps = {
  config: Config
  cartStatus: CartStatus
  openCart: () => void
  closeCart: () => void
}
export default function Aside({
  config,
  cartStatus,
  openCart,
  closeCart,
}: AsideProps): ReactElement {
  const { cartCount, formattedTotalPrice, totalPrice } = useShoppingCart()

  const [lastCartCount, setLastCartCount] = useState(cartCount)

  useEffect(() => {
    if (cartStatus === 'CLOSED' && cartCount !== lastCartCount) {
      openCart()
      setLastCartCount(cartCount)
    }
  }, [cartCount, cartStatus, lastCartCount, openCart])

  return (
    <>
      <DrawerStyled
        anchor="right"
        open={cartStatus === 'OPEN'}
        onClose={closeCart}
      >
        <aside>
          <Body>
            <Box m={4} display="flex" flexDirection="column">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h4">Tu cesta</Typography>
                <IconButton onClick={closeCart}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Box mb={4}>
                <Divider />
              </Box>

              <CartProducts />
            </Box>
          </Body>
          {cartCount > 0 && (
            <>
              <Divider />
              <Box m={4}>
                <Box mb={2}>
                  <Grid container justify="space-between">
                    <Typography>Total</Typography>
                    <Typography>{formattedTotalPrice}</Typography>
                  </Grid>

                  {/* <Grid container justify="space-between">
                    <Typography>Envío</Typography>
                    <Typography>
                      {formatCurrencyString({
                        value: 900,
                        currency: config.currency,
                      })}
                    </Typography>
                  </Grid>

                  <Grid container justify="space-between">
                    <Typography variant="h5" component="p">
                      Total
                    </Typography>
                    <Typography variant="h5" component="p">
                      {formatCurrencyString({
                        value: totalPrice + 900,
                        currency: config.currency,
                      })}
                    </Typography>
                  </Grid> */}
                </Box>

                <Link href="/checkout/address">
                  <Button variant="contained" color="primary" fullWidth>
                    <span>Comenzar pedido</span>
                    <ArrowForwardIcon />
                  </Button>
                </Link>
              </Box>
            </>
          )}
        </aside>
      </DrawerStyled>
    </>
  )
}
