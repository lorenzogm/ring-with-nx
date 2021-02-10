import { ReactElement } from 'react'
import type { Product } from 'types/product'
import { formatCurrencyString } from 'use-shopping-cart'

type PriceProps = {
  product: Product
  currency: string
}

export default function Price({ product, currency }: PriceProps): ReactElement {
  const price = formatCurrencyString({
    value: product.price,
    currency,
  })
  return <span className="text-xl text-gray-900 itatic">{price}</span>
}
