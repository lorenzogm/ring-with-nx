import { StoreCartProductList } from '@ring/store'
import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconArrowForward,
  IconButton,
  IconClose,
  Typography,
  UseToggleHandlers,
  UseToggleState,
} from '@ring/ui'
import { styled } from '@ring/ui/theme'
import Link from 'next/link'
import { ReactElement, useEffect, useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'

type AsideProps = {
  cartStatus: UseToggleState
  openCart: UseToggleHandlers['open']
  closeCart: UseToggleHandlers['close']
}
export default function Aside({
  cartStatus,
  openCart,
  closeCart,
}: AsideProps): ReactElement {
  const { cartCount, formattedTotalPrice } = useShoppingCart()

  const [lastCartCount, setLastCartCount] = useState(cartCount)

  useEffect(() => {
    if (cartStatus === 'CLOSED' && cartCount !== lastCartCount) {
      openCart()
      setLastCartCount(cartCount)
    }
  }, [cartCount, cartStatus, lastCartCount, openCart])

  return (
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
              <IconButton onClick={closeCart} size="large">
                <IconClose />
              </IconButton>
            </Box>

            <Box mb={4}>
              <Divider />
            </Box>

            <StoreCartProductList />
          </Box>
        </Body>
        {cartCount > 0 && (
          <>
            <Divider />
            <Box m={4}>
              <Box mb={2}>
                <Grid container justifyContent="space-between">
                  <Typography variant="h5">Total</Typography>
                  <Typography variant="h5">{formattedTotalPrice}</Typography>
                </Grid>
              </Box>

              <Link href="/store/checkout/address">
                <Button fullWidth>
                  <span>Comenzar pedido</span>
                  <IconArrowForward />
                </Button>
              </Link>
            </Box>
          </>
        )}
      </aside>
    </DrawerStyled>
  )
}

const DrawerStyled = styled(Drawer)`
  .MuiDrawer-paper {
    ${({ theme }) => theme.breakpoints.down('md')} {
      width: 100%;
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
      min-width: 400px;
    }
  }
`

const Body = styled.aside`
  display: flex;
  min-height: calc(100vh - 245px);
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing(6)}px;
`
