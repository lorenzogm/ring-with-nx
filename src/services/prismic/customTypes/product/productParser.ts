/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Document } from 'prismic-javascript/types/documents'
import { Config } from 'types/config'
import { Product } from 'types/product'
import categoryParser from '../category/categoryParser'

type ProductParser = {
  product: Document
  currency: Config['currency']
}

export default function productParser({
  product,
  currency,
}: ProductParser): Product {
  return {
    slug: product.uid as Product['slug'],
    name: product.data.name as Product['name'],
    description: (product.data.description || '') as Product['description'],
    price: new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency,
    }).format(product.data.price),
    image: product.data.colors[0].image.url as Product['image'],
    colors: product.data.colors as Product['colors'],
    sizes: product.data.sizes as Product['sizes'],
    category: categoryParser({ category: product.data.category as Document }),
  }
}
