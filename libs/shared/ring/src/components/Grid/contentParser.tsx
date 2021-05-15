import Carousel, { CarouselParsed } from '../Carousel'
import Teaser, { TeaserParsed } from '../Teaser'
import { FC } from 'react'

const mapping = {
  carousel: Carousel,
  teaser: Teaser,
}

export default function sectionParser(
  component: CarouselParsed | TeaserParsed,
  index: number,
  Image: FC,
) {
  const { type, ...props } = component
  const Component = mapping[type]

  // @ts-expect-error don't know how to fix it
  return <Component key={index.toString()} Image={Image} {...props} />
}
