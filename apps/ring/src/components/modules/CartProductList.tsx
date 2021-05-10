import Grid from '@material-ui/core/Grid'
import { ReactElement } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import Image from 'components/elements/Image'

export default function CartProductList(): ReactElement {
  const {
    cartDetails,
    incrementItem,
    decrementItem,
    cartCount,
  } = useShoppingCart()

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
          <Grid container spacing={2}>
            <Grid item xs={4}>
              {cartItem.image && (
                <Image
                  src={cartItem.image}
                  alt={cartItem.name}
                  width={100}
                  height={100}
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
                  <IconButton onClick={() => decrementItem(cartItem.sku)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{cartItem.quantity}</Typography>
                  <IconButton onClick={() => incrementItem(cartItem.sku)}>
                    <AddIcon />
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
