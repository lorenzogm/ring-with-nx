import Prismic from 'prismic-javascript'
import type {
  GetAllProductsByCategoryProps,
  Product,
} from 'services/CMS/product'
import client from '../../client'
import productParser from './productParser'

export default async function getAllProductsByCategory({
  category,
}: GetAllProductsByCategoryProps): Promise<Product[]> {
  const products = await client.query(
    [
      // Prismic.Predicates.at('document.type', 'product'),
      Prismic.Predicates.at('my.product.category', category),
    ],
    { fetchLinks: 'category.name' },
  )

  return products.results.map((product) => productParser({ product }))
}
