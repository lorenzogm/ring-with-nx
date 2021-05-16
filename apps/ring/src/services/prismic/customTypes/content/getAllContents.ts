import Prismic from 'prismic-javascript'
import type { GetAllContents } from 'services/CMS/content'
import Client from '../../client'

const getAllContents: GetAllContents = async ({ ref, excludeByUID = [] }) => {
  const client = Client()
  const documents = await client.query(
    [
      Prismic.Predicates.at('document.type', 'content'),
      ...excludeByUID.map((uid) =>
        Prismic.Predicates.not('my.content.uid', uid),
      ),
    ],
    {
      ...(ref ? { ref } : {}),
    },
  )

  return documents.results
}

export default getAllContents
