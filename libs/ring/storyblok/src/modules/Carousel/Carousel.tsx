import { Carousel as CarouselRing } from '@ring/core/index'
import { CarouselStoryblok } from '@ring/storyblok/types'
import { ReactElement } from 'react'

type CarouselProps = CarouselStoryblok

export function Carousel({ items }: CarouselProps): ReactElement {
  return (
    <CarouselRing
      items={items.map((item) => ({ src: item.filename, alt: item.alt || '' }))}
    />
  )
}
