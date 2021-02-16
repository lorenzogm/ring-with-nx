/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Prismic from 'prismic-javascript'
import type { GetContentByUID } from 'services/CMS/content'
import Client from '../../client'

import contentParser from './contentParser'

const getContentByUID: GetContentByUID = async ({ uid, ref, fetchLinks }) => {
  const client = Client()

  const document = await client.getByUID('content', uid, {
    ...(ref ? { ref } : {}),
    ...(fetchLinks ? { fetchLinks } : {}),
  })

  const sliceListOfProducts = document.data.body.find(
    (slice: any) => slice.slice_type === 'list_of_products',
  )

  if (sliceListOfProducts) {
    const productsUID = sliceListOfProducts.items.map(
      ({ products }: { products: any }) => products.id,
    )

    const products = await client.query(
      Prismic.Predicates.any('document.id', productsUID),
      {
        fetch: ['colors'],
        fetchLinks: 'category.name',
        ...(ref ? { ref } : {}),
      },
    )

    const sliceListOfProductsIndex = document.data.body.findIndex(
      (slice: any) => slice.slice_type === 'list_of_products',
    )

    document.data.body[sliceListOfProductsIndex].items = document.data.body[
      sliceListOfProductsIndex
    ].items.map((item: any, index: number) => ({
      products: products.results[index],
    }))

    return contentParser({ document })
  }

  return contentParser({ document })
}

export default getContentByUID
