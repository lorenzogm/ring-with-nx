/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Prismic from 'prismic-javascript'
import { Product } from 'services/CMS/product'
import client from '../../client'
import productParser from './productParser'

export default async function getAllProducts(): Promise<Product[]> {
  const productsResponse = await client.query(
    Prismic.Predicates.at('document.type', 'product'),
    { fetchLinks: 'category.name' },
  )

  const products: Product[] = productsResponse.results.map((product) =>
    productParser({ product }),
  )

  return products
}
