import type { GetContentByUID } from 'services/CMS/content'
import client from '../../client'
import contentParser from './contentParser'

const getContentByUID: GetContentByUID = async ({ uid }) => {
  const document = await client.getByUID('content', uid, {})

  return contentParser({ document })
}

export default getContentByUID
