import { TitleParsed } from '../Title'

export type TeaserProps = {
  variant: 'HERO' | 'BASIC' | 'EXTENDED'
  title: TitleParsed
  subtitle: TitleParsed
  image: Image
}

export type TeaserParsed = TeaserProps & {
  type: 'teaser'
}
