import { Product, ProductSku } from 'services/CMS/product'
import getAllProducts from './getAllProducts'

export default async function getAllProductsSku(): Promise<Product[]> {
  const products = await getAllProducts()

  const productsSku: ProductSku[] = []

  products.forEach((product) => {
    product.colors.forEach((color) => {
      product.sizes.forEach((size) => {
        productsSku.push({
          ...product,
          sku: `${product.slug}-${color.color}-${size.value}`,
          image: color.image.url,
          currency: 'EUR',
        })
      })
    })
  })

  return productsSku
}
