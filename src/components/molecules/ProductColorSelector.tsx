import Image from 'next/image'
import { ReactElement } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import type { Product } from 'types/product'
import type { Image as ImageType } from 'types/image'

type ProductColorSelectorProps = {
  product: Product
  colorSelected: string
  onSelectColor: ({ image, color }: { color: string; image: ImageType }) => void
}

export default function ProductColorSelector({
  product,
  colorSelected,
  onSelectColor,
}: ProductColorSelectorProps): ReactElement | null {
  if (!product.colors) {
    return null
  }

  return (
    <div>
      <div>Color: {colorSelected}</div>
      <Grid container>
        {product.colors.map(({ image, color }) => (
          <Grid item key={color} xs={4} sm={2}>
            <Button onClick={() => onSelectColor({ image, color })}>
              <Paper elevation={colorSelected === color ? 4 : 0}>
                <Image
                  src={image.url}
                  alt={image.alt || color}
                  width={100}
                  height={100}
                />
              </Paper>
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
