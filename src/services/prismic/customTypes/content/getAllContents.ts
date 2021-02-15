import Prismic from 'prismic-javascript'
import type { GetAllContents } from 'services/CMS/content'
import Client from '../../client'

import contentParser from './contentParser'

const getAllContents: GetAllContents = async ({ ref }) => {
  const client = Client()
  const documents = await client.query(
    Prismic.Predicates.at('document.type', 'content'),
    {
      ...(ref ? { ref } : {}),
    },
  )

  return documents.results.map((document) => contentParser({ document }))
}

export default getAllContents
