import { ReactElement } from 'react'
import { format } from 'date-fns-tz'
import Typography from '@material-ui/core/Typography'
import IconArrowForward from '@material-ui/icons/ArrowForward'
import { Date, RichText } from 'prismic-reactjs'
import Grid from '@material-ui/core/Grid'
import Link from 'components/elements/Link'
import { BlogPost } from 'types/blogPost'

type BlogPostListItemProps = {
  blogPostEntry: BlogPost
}

export default function BlogPostListItem({
  blogPostEntry,
}: BlogPostListItemProps): ReactElement {
  const date = Date(blogPostEntry.dateFirstPublication)
  const dateFirstPublication = format(date, 'MMMM dd, yyyy')

  return (
    <Grid item>
      <article>
        <Link href={`/blog/${blogPostEntry.uid}`}>
          <Typography variant="h4">{blogPostEntry.title}</Typography>
          <Typography>{dateFirstPublication}</Typography>
          <Typography>{RichText.render(blogPostEntry.excerpt)}</Typography>
          <Grid container alignItems="center">
            <Typography variant="button">Read</Typography>
            <IconArrowForward fontSize="small" />
          </Grid>
        </Link>
      </article>
    </Grid>
  )
}
