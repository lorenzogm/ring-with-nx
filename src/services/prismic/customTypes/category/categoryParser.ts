/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Document } from 'prismic-javascript/types/documents'
import { Category } from 'types/category'

type CategoryParser = {
  category: Document
}

export default function categoryParser({ category }: CategoryParser): Category {
  return {
    slug: category.uid as Category['slug'],
    name: category.data.name as Category['name'],
    description: (category.data.description || '') as Category['description'],
    tags: category.tags,
  }
}
