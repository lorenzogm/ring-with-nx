import type { GetCategoryByUID } from 'services/CMS/category'
import Client from '../../client'

import categoryParser from './categoryParser'

const getCategoryByUID: GetCategoryByUID = async ({ uid, ref }) => {
  const client = Client()
  const category = await client.getByUID('category', uid, {
    ...(ref ? { ref } : {}),
  })

  return categoryParser({
    document: category,
  })
}

export default getCategoryByUID
