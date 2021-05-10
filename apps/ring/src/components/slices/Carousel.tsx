import { ReactElement } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'

import Image from 'components/elements/Image'
import type { SliceCarousel } from 'types/slices'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

type CarouselProps = {
  items: SliceCarousel['items']
}

export default function Carousel({ items }: CarouselProps): ReactElement {
  return (
    <SliderStyled dots>
      {items.map((item) => (
        <Image
          key={item.image.url}
          src={item.image.url}
          alt={item.image.alt}
          width={item.image.dimensions.width}
          height={item.image.dimensions.height}
        />
      ))}
    </SliderStyled>
  )
}

const SliderStyled = styled(Slider)`
  .slick-arrow {
    &:before {
      color: black;
    }
  }
`
