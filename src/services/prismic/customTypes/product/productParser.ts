/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Document } from 'prismic-javascript/types/documents'
import { Config } from 'services/CMS/config'
import { Product } from 'services/CMS/product'
import categoryParser from '../category/categoryParser'

type ProductParser = {
  product: Document
  currency: Config['currency']
}

export default function productParser({
  product,
  currency,
}: ProductParser): Product {
  if (currency !== 'EUR') {
    throw new Error(
      'Only "EUR" is supported. More currencies should be implemented with "Intl.NumberFormat"',
    )
  }

  return {
    slug: product.uid as Product['slug'],
    name: product.data.name as Product['name'],
    description: (product.data.description || '') as Product['description'],
    price: `${product.data.price as string} €`,
    image: product.data.colors[0].image.url as Product['image'],
    colors: product.data.colors as Product['colors'],
    sizes: product.data.sizes as Product['sizes'],
    category: categoryParser({ category: product.data.category as Document }),
  }
}
