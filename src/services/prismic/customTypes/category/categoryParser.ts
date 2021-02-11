import type { Document } from 'prismic-javascript/types/documents'
import type { Category } from 'types/category'

type CategoryParser = {
  document: Document
}

export default function categoryParser({ document }: CategoryParser): Category {
  if (!document.uid) {
    throw new Error('Undefined "document.uid"')
  }

  return {
    id: document.id,
    uid: document.uid,
    type: document.type,
    name: document.data.name,
    description: document.data.description || '',
    tags: document.tags,
  }
}
