import type { Document } from 'prismic-javascript/types/documents'
import type { Category } from 'types/category'

type CategoryParser = {
  category: Document
}

export default function categoryParser({ category }: CategoryParser): Category {
  return {
    id: category.id,
    slug: category.uid as Category['slug'],
    name: category.data.name as Category['name'],
    description: (category.data.description || '') as Category['description'],
    tags: category.tags,
  }
}
