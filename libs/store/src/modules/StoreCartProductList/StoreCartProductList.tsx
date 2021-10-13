import {
  Box,
  Divider,
  Grid,
  IconAdd,
  IconButton,
  IconRemove,
  Image,
  Typography,
} from '@ring/ui'
import { ReactElement } from 'react'
import { useShoppingCart } from 'use-shopping-cart'

export function StoreCartProductList(): ReactElement {
  const { cartDetails, incrementItem, decrementItem, cartCount } =
    useShoppingCart()

  if (cartCount === 0) {
    return <p>Tu cesta está vacía</p>
  }

  return (
    <Grid container direction="column">
      {Object.values(cartDetails).map((cartItem, index) => (
        <Grid item key={cartItem.sku}>
          {index !== 0 && (
            <Box mb={2}>
              <Divider />
            </Box>
          )}
          <Grid container>
            <Grid item xs={4}>
              {cartItem.image && (
                <Image
                  src={cartItem.image}
                  alt={cartItem.name}
                  layout="responsive"
                  width={1}
                  height={1}
                />
              )}
            </Grid>
            <Grid item xs={8}>
              <Grid container direction="column">
                <Typography>{cartItem.name}</Typography>
                <Typography>{cartItem.formattedValue}</Typography>
                <Typography>Color: {cartItem.color}</Typography>
                <Typography>Talla: {cartItem.size}</Typography>
                <Grid container alignItems="center">
                  <IconButton
                    onClick={() => {
                      decrementItem(cartItem.sku)
                    }}
                    size="large"
                  >
                    <IconRemove />
                  </IconButton>
                  <Typography>{cartItem.quantity}</Typography>
                  <IconButton
                    onClick={() => {
                      incrementItem(cartItem.sku)
                    }}
                    size="large"
                  >
                    <IconAdd />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}
