import Prismic from 'prismic-javascript'
import type { GetAllProductsByTagsProps, Product } from 'services/CMS/product'
import client from '../../client'
import productParser from './productParser'

export default async function getAllProductsByTags({
  tags,
}: GetAllProductsByTagsProps): Promise<Product[]> {
  const products = await client.query(
    [
      Prismic.Predicates.at('document.type', 'product'),
      Prismic.Predicates.any('document.tags', tags),
    ],
    { fetchLinks: 'category.name' },
  )

  return products.results.map((product) => productParser({ product }))
}
