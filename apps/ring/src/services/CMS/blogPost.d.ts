import type { BlogPost } from 'types/blogPost'

// GetAllBlogPostEntries
export type GetAllBlogPostEntries = ({
  ref,
}: {
  ref?: string
}) => Promise<BlogPost[]>
