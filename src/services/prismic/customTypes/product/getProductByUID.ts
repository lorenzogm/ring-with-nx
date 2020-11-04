import { Product } from 'types/product'
import client from '../../client'
import productParser from './productParser'

type GetProductByUID = {
  uid: string
  currency: string
}

export default async function getProductByUID({
  uid,
  currency,
}: GetProductByUID): Promise<Product> {
  const product = await client.getByUID('product', uid, {
    fetchLinks: 'category.name',
  })

  return productParser({
    product,
    currency,
  })
}
