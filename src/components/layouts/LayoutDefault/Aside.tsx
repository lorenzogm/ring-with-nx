import { ReactElement, useEffect, useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import Link from 'next/link'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import CloseIcon from '@material-ui/icons/Close'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'

import Button from '@material-ui/core/Button'
import CartProducts from 'components/molecules/CartProductList'

export type CartStatus = 'OPEN' | 'CLOSED'

type AsideProps = {
  cartStatus: CartStatus
  openCart: () => void
  closeCart: () => void
}
export default function Aside({
  cartStatus,
  openCart,
  closeCart,
}: AsideProps): ReactElement {
  const { cartCount } = useShoppingCart()

  const [lastCartCount, setLastCartCount] = useState(cartCount)

  useEffect(() => {
    if (cartStatus === 'CLOSED' && cartCount !== lastCartCount) {
      openCart()
      setLastCartCount(cartCount)
    }
  }, [cartCount, cartStatus, lastCartCount, openCart])

  return (
    <>
      <Drawer anchor="right" open={cartStatus === 'OPEN'} onClose={closeCart}>
        <aside>
          <Box m={4} minWidth={300}>
            <Grid container direction="column">
              <Grid container justify="space-between" alignItems="center">
                <Typography variant="h4">Tu cesta</Typography>
                <IconButton onClick={closeCart}>
                  <CloseIcon />
                </IconButton>
              </Grid>

              <Box mb={4}>
                <Divider />
              </Box>

              <CartProducts />
              {cartCount > 0 && (
                <>
                  <Divider />

                  <Link href="/checkout/address">
                    <Button variant="contained" color="primary">
                      <span>Comenzar pedido</span>
                      <ArrowForwardIcon />
                    </Button>
                  </Link>
                </>
              )}
            </Grid>
          </Box>
        </aside>
      </Drawer>
    </>
  )
}
