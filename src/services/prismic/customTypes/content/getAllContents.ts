import Prismic from 'prismic-javascript'
import type { GetAllContents } from 'services/CMS/content'
import client from '../../client'
import contentParser from './contentParser'

const getAllContents: GetAllContents = async () => {
  const documents = await client.query(
    Prismic.Predicates.at('document.type', 'content'),
  )

  return documents.results.map((document) => contentParser({ document }))
}

export default getAllContents
