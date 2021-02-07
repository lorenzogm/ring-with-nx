import { ProductSku } from 'services/CMS/product'
import getAllProducts from './getAllProducts'

export default async function getAllProductsSku(): Promise<ProductSku[]> {
  const products = await getAllProducts()

  const productsSku: ProductSku[] = []

  products.forEach((product) => {
    product.colors.forEach((color) => {
      product.sizes.forEach((size) => {
        productsSku.push({
          name: product.name,
          sku: `${product.slug}-${color.color}-${size.value}`,
          price: product.price,
          image: color.image.url,
          currency: 'EUR',
        })
      })
    })
  })

  return productsSku
}
