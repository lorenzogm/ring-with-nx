import { GetProductByUIDProps, Product } from 'services/CMS/product'
import client from '../../client'
import productParser from './productParser'

export default async function getProductByUID({
  uid,
}: GetProductByUIDProps): Promise<Product> {
  const product = await client.getByUID('product', uid, {
    fetchLinks: 'category.name',
  })

  return productParser({
    product,
  })
}
