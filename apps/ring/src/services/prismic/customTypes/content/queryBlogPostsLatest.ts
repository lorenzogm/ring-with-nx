/* eslint-disable @typescript-eslint/no-explicit-any */

import { Document } from 'prismic-javascript/types/documents'
import getAllBlogPostEntries from '../blogPost/getAllBlogPostEntries'

const SLICE_TYPE = 'blog_posts__latest'

type QueryBlogPostsLatest = {
  document: Document
  ref: string | undefined
}

export default async function queryBlogPostsLatest({
  document,
  ref,
}: QueryBlogPostsLatest): Promise<Document> {
  const isSliceInTheDocument = document.data.body.find(
    (slice: any) => slice.slice_type === SLICE_TYPE,
  )

  if (!isSliceInTheDocument) {
    return document
  }

  const documentUpdated = document

  const blogPostEntries = await getAllBlogPostEntries({
    ref,
  })

  const sliceIndex = documentUpdated.data.body.findIndex(
    (slice: any) => slice.slice_type === SLICE_TYPE,
  )

  documentUpdated.data.body[sliceIndex].items = blogPostEntries

  return documentUpdated
}
