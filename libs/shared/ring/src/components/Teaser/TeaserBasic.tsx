import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { useMediaQuery } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Title from '@ring/components/Title'
import { TeaserProps } from './index.d'
import ImageRing from '../Image'
import styled from 'styled-components'

type TeaserBasicProps = Omit<TeaserProps, 'variant'>

export default function TeaserBasic({
  title,
  subtitle,
  image,
  justify = 'flex-start',
  Image,
}: TeaserBasicProps) {
  const isMdOrGreater = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md'),
  )

  return (
    <GridStyled
      container
      direction="column"
      alignItems="center"
      justify={justify}
    >
      {image ? <ImageRing as={Image} image={image} /> : null}
      {title ? <Title variant={title.variant} text={title.text} /> : null}
      {subtitle ? (
        <Title
          variant={subtitle.variant}
          text={subtitle.text}
          align={isMdOrGreater ? 'center' : 'left'}
        />
      ) : null}
    </GridStyled>
  )
}

const GridStyled = styled(Grid)`
  height: 100%;
`
