import type { GetContentByUID } from 'services/CMS/content'
import Client from '../../client'

import contentParser from './contentParser'

const getContentByUID: GetContentByUID = async ({ uid, ref }) => {
  const client = Client()
  const document = await client.getByUID('content', uid, {
    ...(ref ? { ref } : {}),
  })

  return contentParser({ document })
}

export default getContentByUID
