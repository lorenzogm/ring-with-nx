/* eslint-disable testing-library/no-await-sync-query */
/* eslint-disable testing-library/prefer-screen-queries */

import type { GetContentByUID } from 'services/CMS/content'
import Client from '../../client'

import contentParser from './contentParser'

const getContentByUID: GetContentByUID = async ({
  uid,
  ref,
  fetchLinks,
  graphQuery,
}) => {
  const client = Client()

  let document = await client.getByUID('content', uid, {
    ...(ref ? { ref } : {}),
    ...(fetchLinks ? { fetchLinks } : {}),
    ...(graphQuery ? { graphQuery } : {}),
  })

  return contentParser({ document })
}

export default getContentByUID
