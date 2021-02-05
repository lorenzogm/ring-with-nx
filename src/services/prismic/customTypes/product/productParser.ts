/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Document } from 'prismic-javascript/types/documents'
import { Product } from 'services/CMS/product'
import categoryParser from '../category/categoryParser'

type ProductParser = {
  product: Document
}

export default function productParser({ product }: ProductParser): Product {
  return {
    name: product.data.name as Product['name'],
    slug: product.uid as Product['slug'],
    description: product.data.description as Product['description'],
    price: product.data.price * 100,
    imageDefault: product.data.colors[0].image.url as Product['imageDefault'],
    colorDefault: product.data.colors[0].color as Product['colorDefault'],
    colors: product.data.colors as Product['colors'],
    sizes: product.data.sizes.map(({ size }: { size: string }) => ({
      label: size,
      value: size,
    })) as Product['sizes'],
    category: categoryParser({ category: product.data.category as Document }),
  }
}
