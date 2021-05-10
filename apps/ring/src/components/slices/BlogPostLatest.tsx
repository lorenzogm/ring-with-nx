import { ReactElement } from 'react'
import styled from 'styled-components'

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from 'components/elements/Typography'
import { BlogPost } from 'types/blogPost'
import BlogPostList from 'components/modules/BlogPostList'

const DividerStyled = styled(Divider)`
  margin-top: ${({ theme }) => `${theme.spacing(1)}px`};
  margin-bottom: ${({ theme }) => `${theme.spacing(2)}px`};
  width: 100%;
`

type BlogPostLatestProps = {
  blogPostEntries: BlogPost[]
}
export default function BlogPostLatest({
  blogPostEntries,
}: BlogPostLatestProps): ReactElement {
  return (
    <Grid container>
      <Typography variant="h3" component="h2">
        Blog
      </Typography>

      <DividerStyled />

      <BlogPostList blogPostEntries={blogPostEntries} />
    </Grid>
  )
}
