import { Document } from 'prismic-javascript/types/documents'
import { BlogPost } from 'types/blogPost'

type BlogPostParser = {
  blogPost: Document
}

export default function blogPostParser({ blogPost }: BlogPostParser): BlogPost {
  if (!blogPost.uid) {
    throw new Error(`Undefined blogPost UID: ${JSON.stringify(blogPost)}`)
  }

  return {
    content: blogPost.data.content,
    cover: blogPost.data.cover,
    dateFirstPublication: blogPost.first_publication_date as string,
    dateLastPublication: blogPost.last_publication_date,
    excerpt: blogPost.data.excerpt,
    title: blogPost.data.title,
    type: 'blog_post',
    uid: blogPost.uid,
  }
}
