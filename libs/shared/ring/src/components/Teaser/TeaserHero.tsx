import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Typography from '@ring/components/Typography'
import { TeaserProps } from './index.d'
import Image from '../Image'

type TeaserHeroProps = Omit<TeaserProps, 'variant'>

export default function TeaserHero({
  title,
  subtitle,
  image,
}: TeaserHeroProps) {
  return (
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
  )
}

const ProfilePicture = styled(Image)`
  border-radius: 50%;
`
