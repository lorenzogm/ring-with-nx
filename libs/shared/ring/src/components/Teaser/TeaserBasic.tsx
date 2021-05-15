import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { useMediaQuery } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Title from '@ring/components/Title'
import { TeaserProps } from './index.d'
import Image from '../Image'

type TeaserBasicProps = Omit<TeaserProps, 'variant'>

export default function TeaserBasic({
  title,
  subtitle,
  image,
}: TeaserBasicProps) {
  const isMdOrGreater = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md'),
  )

  return (
    <Grid container direction="column" alignItems="center">
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
        />
      )}
      <Title variant={title.variant} text={title.text} />
      {subtitle && (
        <Title
          variant={subtitle.variant}
          text={subtitle.text}
          align={isMdOrGreater ? 'center' : 'left'}
        />
      )}
    </Grid>
  )
}
