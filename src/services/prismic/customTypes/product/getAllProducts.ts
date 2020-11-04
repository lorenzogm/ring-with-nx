/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Prismic from 'prismic-javascript'
import { Config } from 'types/config'
import { Product } from 'types/product'
import client from '../../client'
import productParser from './productParser'

type GetAllProducts = {
  currency: Config['currency']
}

export default async function getAllProducts({
  currency,
}: GetAllProducts): Promise<Product[]> {
  const productsResponse = await client.query(
    Prismic.Predicates.at('document.type', 'product'),
    { fetchLinks: 'category.name' },
  )

  const products: Product[] = productsResponse.results.map((product) =>
    productParser({ product, currency }),
  )

  return products
}
