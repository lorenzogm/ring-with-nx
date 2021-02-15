import Prismic from 'prismic-javascript'
import type { Document } from 'prismic-javascript/types/documents'

import type { Category } from 'types/category'
import type { Product } from 'types/product'
import Client from '../client'

export type GetDocumentByUID = ({
  uid,
}: {
  uid: string
}) => Promise<Document | Category | Product>

const getDocumentByUID: GetDocumentByUID = async ({ uid }) => {
  // const contentPage = await client().getByUID('content_page', uid, {})

  const client = Client()
  const document = await client.query(
    Prismic.Predicates.at('document.uid', uid),
  )

  return document.results[0]
}

export default getDocumentByUID
