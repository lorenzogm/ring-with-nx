import type { Document } from 'prismic-javascript/types/documents'
import type { Content } from 'types/content'

type SliceParser = ({ slice }: { slice: Slice }) => Carousel | Slice

const sliceParser: SliceParser = ({ slice }) => {
  if (slice.slice_type === 'carousel') {
    return {
      sliceType: slice.slice_type,
      items: slice.items.map((item) => ({
        image: item.image,
        text: item.text,
        buttonText: item.button_text,
        buttonLink: item.button_link,
      })),
    } as Carousel
  }
  return slice
}

type ContentParser = ({ document }: { document: Document }) => Content

const contentParser: ContentParser = ({ document }) => {
  if (!document.uid) {
    throw new Error('Undefined "document.uid"')
  }

  return {
    id: document.id,
    uid: document.uid,
    type: document.type,
    data: {
      title: document.data.title,
      body: document.data.body.map((slice) => sliceParser({ slice })),
    },
  }
}

export default contentParser
