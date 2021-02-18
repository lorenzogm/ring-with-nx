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

  if (!product.data.colors[0] || !product.data.colors[0].image) {
    throw new Error(`Undefined default image`)
  }

  return {
    brand: product.data.brand || null,
    name: product.data.name,
    uid: product.uid,
    type: 'product',
    description: product.data.description || null,
    price: product.data.price * 100,
    imageDefault: product.data.colors[0].image,
    category: categoryParser({ document: product.data.category }),
    // colors are optional
    ...(product.data.colors
      ? {
          colorDefault: product.data.colors[0].color,
          colors: product.data.colors,
        }
      : {}),
    // sizes are optional
    ...(product.data.sizes
      ? {
          sizes: product.data.sizes.map(({ size }: { size: string }) => ({
            label: size,
            value: size,
          })),
        }
      : {}),
  }
}
