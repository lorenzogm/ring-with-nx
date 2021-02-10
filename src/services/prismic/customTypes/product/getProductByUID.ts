import type { GetProductByUID } from 'services/CMS/product'

import client from '../../client'
import productParser from './productParser'

const getProductByUID: GetProductByUID = async ({ uid }) => {
  const product = await client.getByUID('product', uid, {
    fetchLinks: 'category.name',
  })

  return productParser({
    product,
  })
}

export default getProductByUID
