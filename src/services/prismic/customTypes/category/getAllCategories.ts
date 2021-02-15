import Prismic from 'prismic-javascript'
import type { GetAllCategories } from 'services/CMS/category'
import type { Category } from 'types/category'
import Client from '../../client'

import categoryParser from './categoryParser'

const getAllCategories: GetAllCategories = async ({ ref }) => {
  const client = Client()
  const response = await client.query(
    Prismic.Predicates.at('document.type', 'category'),
    {
      ...(ref ? { ref } : {}),
    },
  )

  const categories: Category[] = response.results.map((category) =>
    categoryParser({ document: category }),
  )

  return categories
}

export default getAllCategories
