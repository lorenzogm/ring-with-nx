import type { GetContentByUID } from 'services/CMS/content'
import Client from '../../client'

import contentParser from './contentParser'
import graphQuery from './graphQuery'

const getContentByUID: GetContentByUID = async ({ uid, ref }) => {
  const client = Client()

  let document = await client.getByUID('content', uid, {
    graphQuery,
    ...(ref ? { ref } : {}),
  })

  return contentParser({ document })
}

export default getContentByUID
