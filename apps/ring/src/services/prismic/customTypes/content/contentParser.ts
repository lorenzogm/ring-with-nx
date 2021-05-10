/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Document } from 'prismic-javascript/types/documents'
import type { Content } from 'types/content'
import type {
  Slice,
  SliceBlogPostLatest,
  SliceCarousel,
  SliceImage,
  SliceListOfProducts,
  SliceTeaser,
} from 'types/slices'
import productParser from '../product/productParser'

export default function contentParser({
  document,
}: {
  document: Document
}): Content {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      body: document.data.body.map((slice: any) => sliceParser({ slice })),
    },
  }
}

function sliceParser({ slice }: { slice: any }): Slice {
  switch (slice.slice_type) {
    case 'blog_posts__latest':
      return {
        sliceType: slice.slice_type,
        items: slice.items,
      } as SliceBlogPostLatest

    case 'carousel':
      return {
        sliceType: slice.slice_type,
        items: slice.items.map((item: any) => ({
          image: item.image,
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

    case 'teaser':
      return {
        sliceType: slice.slice_type,
        variant: slice.primary.variant,
        items: slice.items,
      } as SliceTeaser

    default:
      throw new Error(
        `Unexpected "slice.slice_type" = "${slice.slice_type as string}"`,
      )
  }
}
