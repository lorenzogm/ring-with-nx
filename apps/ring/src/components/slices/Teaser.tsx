import { ReactElement } from 'react'
import styled from 'styled-components'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { useMediaQuery } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Image from 'components/elements/Image'
import Typography from '@ring/components/Typography'
import { SliceTeaser, SliceTeaserItem } from 'types/slices'

type TeaserProps = Pick<SliceTeaser, 'variant' | 'items'>

export default function Teaser({ variant, items }: TeaserProps): ReactElement {
  switch (variant) {
    case 'HERO':
      return (
        <TeaserHero
          title={items[0].title}
          subtitle={items[0].subtitle}
          image={items[0].image}
        />
      )

    case 'LIST':
      return <TeaserList items={items} />

    case 'SINGLE':
      return (
        <TeaserSingle title={items[0].title} subtitle={items[0].subtitle} />
      )

    default:
      throw new Error(`Unexpected Teaser variant "${variant}"`)
  }
}

type TeaserHeroProps = SliceTeaserItem

function TeaserHero({ title, subtitle, image }: TeaserHeroProps) {
  return (
    <Box mt={10} mb={20}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h1">
            {title}
          </Typography>
          <Typography variant="h5" component="p">
            {subtitle}
          </Typography>
        </Grid>
        <Grid item>
          <ProfilePicture
            src={image.url}
            alt={image.alt}
            width={200}
            height={200}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

const ProfilePicture = styled(Image)`
  border-radius: 50%;
`

type TeaserListProps = Pick<SliceTeaser, 'items'>

function TeaserList({ items }: TeaserListProps) {
  const isMdOrGreater = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md'),
  )

  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item key={item.title} xs={12} sm={6} md={3}>
          <Image
            src={item.image.url}
            alt={item.image.alt}
            width={isMdOrGreater ? 300 : 500}
            height={isMdOrGreater ? 300 * 0.75 : 500 * 0.75}
          />
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="body1">{item.subtitle}</Typography>
        </Grid>
      ))}
    </Grid>
  )
}

type TeaserSingleProps = Pick<SliceTeaserItem, 'title' | 'subtitle'>

function TeaserSingle({ title, subtitle }: TeaserSingleProps) {
  const isMdOrGreater = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md'),
  )
  return (
    <Box mt={10} mb={20}>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h3" component="h1">
          {title}
        </Typography>
        <Typography
          variant="h5"
          component="p"
          align={isMdOrGreater ? 'center' : 'left'}
        >
          {subtitle}
        </Typography>
      </Grid>
    </Box>
  )
}
