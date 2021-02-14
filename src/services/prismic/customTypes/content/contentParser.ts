import type { Document } from 'prismic-javascript/types/documents'
import imageParser from 'services/prismic/fields/imageParser'
import type { Content } from 'types/content'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SliceParser = ({ slice }: { slice: any }) => Carousel

const sliceParser: SliceParser = ({ slice }) => {
  if (slice.slice_type === 'carousel') {
    return {
      sliceType: slice.slice_type,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items: slice.items.map((item: any) => ({
        image: imageParser({ image: item.image }),
        text: item.text,
        buttonText: item.button_text,
        buttonLink: item.button_link,
      })),
    } as Carousel
  }

  throw new Error('Unexpected "slice.slice_type"')
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      body: document.data.body.map((slice: any) => sliceParser({ slice })),
    },
  }
}

export default contentParser
