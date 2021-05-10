/* eslint-disable testing-library/no-await-sync-query */
/* eslint-disable testing-library/prefer-screen-queries */

import type { GetContentByUID } from 'services/CMS/content'
import Client from '../../client'

import contentParser from './contentParser'
import queryBlogPostsLatest from './queryBlogPostsLatest'
import queryListOfProducts from './queryListOfProducts'

const getContentByUID: GetContentByUID = async ({ uid, ref, fetchLinks }) => {
  const client = Client()

  let document = await client.getByUID('content', uid, {
    ...(ref ? { ref } : {}),
    ...(fetchLinks ? { fetchLinks } : {}),
  })

  document = await queryListOfProducts({ client, document, ref })
  document = await queryBlogPostsLatest({ document, ref })

  return contentParser({ document })
}

export default getContentByUID
