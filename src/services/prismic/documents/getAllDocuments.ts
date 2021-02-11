import Prismic from 'prismic-javascript'
import { Document } from 'prismic-javascript/types/documents'
import { Category } from 'types/category'
import { Product } from 'types/product'
import client from '../client'
import categoryParser from '../customTypes/category/categoryParser'
import productParser from '../customTypes/product/productParser'

export type GetAllDocuments = ({
  documentTypes,
  fields,
}: {
  documentTypes: ('content' | 'category' | 'product')[]
  fields?: string[]
  fetchLinks?: string
}) => Promise<(Document | Category | Product)[]>

const getAllDocuments: GetAllDocuments = async ({
  documentTypes,
  fields,
  fetchLinks,
}) => {
  const documents = await client.query(
    Prismic.Predicates.any('document.type', documentTypes),
    {
      ...(fields ? { fetch: fields } : {}),
      ...(fetchLinks ? { fetchLinks } : {}),
    },
  )

  return documents.results.map((document) => {
    if (document.type === 'content') {
      return document
    }

    if (document.type === 'category') {
      return categoryParser({ document })
    }

    if (document.type === 'product') {
      return productParser({ product: document })
    }

    return document
  })
}

export default getAllDocuments
