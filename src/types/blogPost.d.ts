import { RichTextBlock } from 'prismic-reactjs'

export type BlogPost = {
  content: RichTextBlock[]
  cover: Image
  dateFirstPublication: string
  dateLastPublication: string | null
  excerpt: RichTextBlock[]
  title: string
  type: 'blog_post'
  uid: string
}
