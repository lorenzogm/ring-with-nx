import { GridJustification } from '@material-ui/core/Grid'
import { ImageProps } from '../Image'
import { TitleParsed } from '../Title'

export type TeaserProps = {
  Image?: ImageProps['as']
  variant: 'HERO' | 'BASIC' | 'EXTENDED'
  title: TitleParsed
  subtitle: TitleParsed
  image: Image
  justify?: GridJustification
}

export type TeaserParsed = TeaserProps & {
  type: 'teaser'
}
