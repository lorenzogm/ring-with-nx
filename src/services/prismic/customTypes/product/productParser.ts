import { Document } from 'prismic-javascript/types/documents'
import type { Product } from 'types/product'
import categoryParser from '../category/categoryParser'

type ProductParser = {
  product: Document
}

export default function productParser({ product }: ProductParser): Product {
  if (!product.uid) {
    throw new Error(`Undefined product UID: ${JSON.stringify(product)}`)
  }

  return {
    name: product.data.name,
    slug: product.uid,
    description: product.data.description || null,
    price: product.data.price * 100,
    imageDefault: product.data.colors[0].image.url,
    colorDefault: product.data.colors[0].color,
    colors: product.data.colors,
    sizes: product.data.sizes.map(({ size }: { size: string }) => ({
      label: size,
      value: size,
    })),
    category: categoryParser({ category: product.data.category as Document }),
  }
}
