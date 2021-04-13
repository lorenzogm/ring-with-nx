import { ReactElement } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns-tz'
import Typography from '@material-ui/core/Typography'
import { Date } from 'prismic-reactjs'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Image from 'components/atoms/Image'
import Link from 'components/atoms/Link'
import theme from 'theme'
import { BlogPost } from 'types/blogPost'

const PaperStyled = styled(Paper)`
  margin-bottom: ${theme.spacing(1)}px;
`

type BlogPostCardProps = {
  blogPostEntry: BlogPost
}

export default function BlogPostCard({
  blogPostEntry,
}: BlogPostCardProps): ReactElement {
  const date = Date(blogPostEntry.dateFirstPublication)
  const dateFirstPublication = format(date, 'MMMM dd, yyyy')

  return (
    <Grid item xs={12} sm={6} md={3}>
      <article>
        <Link href={`/blog/${blogPostEntry.uid}`}>
          <Grid container direction="column">
            <PaperStyled elevation={1}>
              <Image
                src={blogPostEntry.cover.url}
                alt={blogPostEntry.title}
                width={blogPostEntry.cover.dimensions.width}
                height={blogPostEntry.cover.dimensions.height}
              />
            </PaperStyled>
            <Typography variant="subtitle1">{blogPostEntry.title}</Typography>
            <Typography>{dateFirstPublication}</Typography>
          </Grid>
        </Link>
      </article>
    </Grid>
  )
}
