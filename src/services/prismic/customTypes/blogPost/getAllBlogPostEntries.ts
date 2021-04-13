import Prismic from 'prismic-javascript'
import type { GetAllBlogPostEntries } from 'services/CMS/blogPost'
import type { BlogPost } from 'types/blogPost'
import Client from '../../client'

import blogPostParser from './blogPostParser'

const getAllBlogPostEntries: GetAllBlogPostEntries = async ({ ref }) => {
  const client = Client()
  const response = await client.query(
    Prismic.Predicates.at('document.type', 'blog_post'),
    { ...(ref ? { ref } : {}) },
  )

  const entries: BlogPost[] = response.results.map((blogPost) =>
    blogPostParser({ blogPost }),
  )

  return entries
}

export default getAllBlogPostEntries
