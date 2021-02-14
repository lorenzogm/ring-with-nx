import Prismic from 'prismic-javascript'

import type { GetAllProductsByTags } from 'services/CMS/product'
import client from '../../client'
import productParser from './productParser'

const getAllProductsByTags: GetAllProductsByTags = async ({ tags }) => {
  const products = await client.query(
    [
      Prismic.Predicates.at('document.type', 'product'),
      Prismic.Predicates.any('document.tags', tags),
    ],
    { fetchLinks: 'category.name' },
  )

  return products.results.map((product) => productParser({ product }))
}

export default getAllProductsByTags
