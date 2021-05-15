import { ReactElement } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { CarouselProps } from './index.d'
import ImageRing from '../Image'

export default Carousel
export function Carousel({ items, Image }: CarouselProps): ReactElement {
  return (
    <SliderStyled dots>
      {items.map((item) => (
        <ImageRing
          key={item.image.src}
          as={Image}
          src={item.image.src}
          alt={item.image.alt}
          width={item.image.width}
          height={item.image.height}
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
