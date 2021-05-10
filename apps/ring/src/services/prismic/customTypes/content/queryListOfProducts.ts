/* eslint-disable @typescript-eslint/no-explicit-any */
import Prismic from 'prismic-javascript'
import { DefaultClient } from 'prismic-javascript/types/client'
import { Document } from 'prismic-javascript/types/documents'

const SLICE_TYPE = 'list_of_products'

type QueryListOfProducts = {
  client: DefaultClient
  document: Document
  ref: string | undefined
}

export default async function queryListOfProducts({
  client,
  document,
  ref,
}: QueryListOfProducts): Promise<Document> {
  const isSliceInTheDocument = document.data.body.find(
    (slice: any) => slice.slice_type === SLICE_TYPE,
  )

  if (!isSliceInTheDocument) {
    return document
  }

  const documentUpdated = document
  const productsUID = isSliceInTheDocument.items.map(
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

  const sliceIndex = documentUpdated.data.body.findIndex(
    (slice: any) => slice.slice_type === SLICE_TYPE,
  )

  documentUpdated.data.body[sliceIndex].items = documentUpdated.data.body[
    sliceIndex
  ].items.map((item: any, index: number) => ({
    products: products.results[index],
  }))

  return documentUpdated
}
