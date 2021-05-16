import type { Document } from 'prismic-javascript/types/documents'
import type { Content } from 'types/content'
import sliceParser from 'services/prismic/slices/sliceParser'

type ContentParser = {
  document: Document
}

export default function contentParser({ document }: ContentParser): Content {
  if (!document.uid) {
    throw new Error('Undefined "document.uid"')
  }

  return {
    id: document.id,
    uid: document.uid,
    type: 'content',
    data: {
      title: document.data.title,
      imageBackground:
        document.data.image_background && document.data.image_background.url
          ? document.data.image_background
          : null,
      body: document.data.body.map(sliceParser),
    },
  }
}
