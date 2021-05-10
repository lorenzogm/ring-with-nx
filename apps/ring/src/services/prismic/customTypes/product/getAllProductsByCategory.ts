import Prismic from 'prismic-javascript'

import type { GetAllProductsByCategory } from 'services/CMS/product'
import Client from '../../client'

import productParser from './productParser'

const getAllProductsByCategory: GetAllProductsByCategory = async ({
  category,
  ref,
}) => {
  const client = Client()
  const products = await client.query(
    Prismic.Predicates.at('my.product.category', category),
    { fetchLinks: 'category.name', ...(ref ? { ref } : {}) },
  )

  return products.results.map((product) => productParser({ product }))
}

export default getAllProductsByCategory
