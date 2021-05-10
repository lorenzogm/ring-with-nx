import Prismic from 'prismic-javascript'
import type { GetAllProducts } from 'services/CMS/product'
import type { Product } from 'types/product'
import Client from '../../client'

import productParser from './productParser'

const getAllProducts: GetAllProducts = async ({ ref }) => {
  const client = Client()
  const productsResponse = await client.query(
    Prismic.Predicates.at('document.type', 'product'),
    { fetchLinks: 'category.name', ...(ref ? { ref } : {}) },
  )

  const products: Product[] = productsResponse.results.map((product) =>
    productParser({ product }),
  )

  return products
}

export default getAllProducts
