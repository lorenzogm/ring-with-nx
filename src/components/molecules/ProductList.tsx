import Grid from '@material-ui/core/Grid'
import { ReactElement } from 'react'
import type { Product } from 'types/product'
import ProductTile from 'components/molecules/ProductTile'
import type { Config } from 'types/config'

type ProductListProps = {
  config: Config
  products: Product[]
}

export default function ProductList({
  products,
  config,
}: ProductListProps): ReactElement {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <ProductTile
          key={product.uid}
          config={config}
          category={product.category}
          product={product}
        />
      ))}
    </Grid>
  )
}
