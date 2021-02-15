import type { Document } from 'prismic-javascript/types/documents'
import imageParser from 'services/prismic/fields/imageParser'
import type { Content } from 'types/content'
import type { SliceCarousel, SliceImage } from 'types/slices'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SliceParser = ({ slice }: { slice: any }) => SliceCarousel | SliceImage

const sliceParser: SliceParser = ({ slice }) => {
  switch (slice.slice_type) {
    case 'carousel':
      return {
        sliceType: slice.slice_type,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items: slice.items.map((item: any) => ({
          image: imageParser({ image: item.image }),
          text: item.text,
          buttonText: item.button_text,
          buttonLink: item.button_link,
        })),
      } as SliceCarousel

    case 'image':
      return {
        sliceType: slice.slice_type,
        image: imageParser({ image: slice.primary.image }),
      } as SliceImage

    default:
      throw new Error(
        `Unexpected "slice.slice_type" = "${slice.slice_type as string}"`,
      )
  }
}

type ContentParser = ({ document }: { document: Document }) => Content

const contentParser: ContentParser = ({ document }) => {
  if (!document.uid) {
    throw new Error('Undefined "document.uid"')
  }

  return {
    id: document.id,
    uid: document.uid,
    type: 'content',
    data: {
      title: document.data.title,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      body: document.data.body.map((slice: any) => sliceParser({ slice })),
    },
  }
}

export default contentParser
