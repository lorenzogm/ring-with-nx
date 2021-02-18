/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Document } from 'prismic-javascript/types/documents'
import type { Content } from 'types/content'
import type {
  SliceCarousel,
  SliceImage,
  SliceListOfProducts,
} from 'types/slices'
import productParser from '../product/productParser'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SliceParser = ({
  slice,
}: {
  slice: any
}) => SliceCarousel | SliceImage | SliceListOfProducts

const sliceParser: SliceParser = ({ slice }) => {
  switch (slice.slice_type) {
    case 'carousel':
      return {
        sliceType: slice.slice_type,
        items: slice.items.map((item: any) => ({
          image: item.image,
          text: item.text,
          buttonText: item.button_text,
          buttonLink: item.button_link,
        })),
      } as SliceCarousel

    case 'image':
      return {
        sliceType: slice.slice_type,
        image: slice.primary.image,
      } as SliceImage

    case 'list_of_products':
      return {
        sliceType: slice.slice_type,
        title: slice.primary.title1,
        items: slice.items.map((item: any) =>
          productParser({ product: item.products }),
        ),
      } as SliceListOfProducts

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
