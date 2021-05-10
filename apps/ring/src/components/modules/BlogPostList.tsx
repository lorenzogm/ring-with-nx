import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import styled from 'styled-components'
import type { ReactElement } from 'react'
import BlogPostListItem from 'components/modules/BlogPostListItem'
import type { BlogPost } from 'types/blogPost'

const DividerStyled = styled(Divider)`
  margin-top: ${({ theme }) => `${theme.spacing(1)}px`};
  margin-bottom: ${({ theme }) => `${theme.spacing(2)}px`};
  width: 100%;
`

type BlogPostListProps = {
  blogPostEntries: BlogPost[]
}

export default function BlogPostList({
  blogPostEntries,
}: BlogPostListProps): ReactElement {
  return (
    <Grid container spacing={4}>
      {blogPostEntries.map((blogPostEntry, index) => (
        <>
          {index > 0 && <DividerStyled />}
          <BlogPostListItem
            key={blogPostEntry.uid}
            blogPostEntry={blogPostEntry}
          />
        </>
      ))}
    </Grid>
  )
}
