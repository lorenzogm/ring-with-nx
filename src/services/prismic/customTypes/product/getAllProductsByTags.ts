import Prismic from 'prismic-javascript'
import { Config } from 'services/CMS/config'
import type { Product } from 'services/CMS/product'
import client from '../../client'
import productParser from './productParser'

type GetAllProductsByTags = {
  tags: string[]
  config: Config
}

export default async function getAllProductsByTags({
  tags,
  config,
}: GetAllProductsByTags): Promise<Product[]> {
  const products = await client.query(
    [
      Prismic.Predicates.at('document.type', 'product'),
      Prismic.Predicates.any('document.tags', tags),
    ],
    { fetchLinks: 'category.name' },
  )

  return products.results.map((product) =>
    productParser({ product, currency: config.currency }),
  )
}
