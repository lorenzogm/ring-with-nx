import { ReactElement } from 'react'
import { formatCurrencyString } from 'use-shopping-cart'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import type { Category } from 'types/category'
import type { Product } from 'types/product'
import { Config } from 'types/config'
import Image from 'components/atoms/Image'
import Link from 'components/atoms/Link'
import theme from 'theme'

const PaperStyled = styled(Paper)`
  margin-bottom: ${theme.spacing(1)}px;
`

type ProductTileProps = {
  config: Config
  product: Product
  category: Category
}

export default function ProductTile({
  config,
  product,
  category,
}: ProductTileProps): ReactElement {
  const price = formatCurrencyString({
    value: product.price,
    currency: config.currency,
  })

  return (
    <Grid item xs={12} sm={6} md={3}>
      <article>
        <Link href={`/store/${category.uid}/${product.uid}`}>
          <Grid container direction="column">
            <PaperStyled elevation={1}>
              <Image
                src={product.imageDefault.url}
                alt={product.name}
                width={product.imageDefault.dimensions.width}
                height={product.imageDefault.dimensions.height}
              />
            </PaperStyled>
            <Typography variant="subtitle1">{product.name}</Typography>
            <Typography>{price}</Typography>
          </Grid>
        </Link>
      </article>
    </Grid>
  )
}
