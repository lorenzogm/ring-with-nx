import { ReactElement } from 'react'
import { TeaserProps } from './index.d'
import TeaserHero from './TeaserHero'
import TeaserBasic from './TeaserBasic'

export default function Teaser({
  variant,
  ...props
}: TeaserProps): ReactElement | null {
  switch (variant) {
    case 'HERO':
      return <TeaserHero {...props} />

    case 'BASIC':
      return <TeaserBasic {...props} />

    default:
      console.error(`Unexpected Teaser variant "${variant}"`)
      return null
  }
}
