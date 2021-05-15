import { FC } from 'react'
import Carousel, { CarouselParsed } from '../Carousel'
import Teaser, { TeaserParsed } from '../Teaser'
import ShopLocation from '../ShopLocation'

const mapping = {
  carousel: Carousel,
  shopLocation: ShopLocation,
  teaser: Teaser,
}

export default function contentParser(
  component: CarouselParsed | TeaserParsed,
  index: number,
  Image: FC,
) {
  const { type, ...props } = component
  const Component = mapping[type]

  // @ts-expect-error don't know how to fix it
  return <Component key={index.toString()} Image={Image} {...props} />
}
