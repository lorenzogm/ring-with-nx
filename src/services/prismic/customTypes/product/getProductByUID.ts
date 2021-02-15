import type { GetProductByUID } from 'services/CMS/product'
import Client from '../../client'

import productParser from './productParser'

const getProductByUID: GetProductByUID = async ({ uid, ref }) => {
  const client = Client()
  const product = await client.getByUID('product', uid, {
    fetchLinks: 'category.name',
    ...(ref ? { ref } : {}),
  })

  return productParser({
    product,
  })
}

export default getProductByUID
