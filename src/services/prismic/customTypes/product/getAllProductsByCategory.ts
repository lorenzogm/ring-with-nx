import Prismic from 'prismic-javascript'

import type { GetAllProductsByCategory } from 'services/CMS/product'

import client from '../../client'
import productParser from './productParser'

const getAllProductsByCategory: GetAllProductsByCategory = async ({
  category,
}) => {
  const products = await client.query(
    Prismic.Predicates.at('my.product.category', category),
    { fetchLinks: 'category.name' },
  )

  return products.results.map((product) => productParser({ product }))
}

export default getAllProductsByCategory
