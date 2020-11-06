import type { Category } from 'services/CMS/category'
import client from '../../client'
import categoryParser from './categoryParser'

type GetCategoryBySlug = {
  uid: string
}

export default async function getCategoryByUID({
  uid,
}: GetCategoryBySlug): Promise<Category> {
  const category = await client.getByUID('category', uid, {})

  return categoryParser({
    category,
  })
}
