import type { ProductSku } from 'types/product'
import getAllProducts from './getAllProducts'

export default async function getAllProductsSku(): Promise<ProductSku[]> {
  const products = await getAllProducts()

  const productsSku: ProductSku[] = []

  products.forEach((product) => {
    if (product.colors) {
      // "product.colors" is defined

      product.colors.forEach((color) => {
        if (product.sizes) {
          // "product.sizes" is defined

          product.sizes.forEach((size) => {
            // create one SKU per color and size

            productsSku.push({
              name: product.name,
              sku: `${product.uid}-${color.color}-${size.value}`,
              price: product.price,
              image: color.image.url,
              currency: 'EUR',
            })
          })
        } else {
          // create only one SKU per color

          productsSku.push({
            name: product.name,
            sku: `${product.uid}-${color.color}`,
            price: product.price,
            image: color.image.url,
            currency: 'EUR',
          })
        }
      })
    }
  })

  return productsSku
}
