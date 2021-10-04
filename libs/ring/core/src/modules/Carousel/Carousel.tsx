import { Image } from '@ring/core/index'
import { ReactElement } from 'react'
import CarouselMui from 'react-material-ui-carousel'

type CarouselProps = {
  items: Array<{ src: string; alt: string }>
}

export function Carousel({ items }: CarouselProps): ReactElement {
  return (
    <CarouselMui fullHeightHover>
      {items.map((item) => (
        <Image
          key={item.src}
          src={item.src}
          alt={item.alt}
          layout="responsive"
          height={1}
          width={3}
          objectFit="cover"
        />
      ))}
    </CarouselMui>
  )
}
