import { ReactElement } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { CarouselProps } from './index.d'
import ImageRing from '../Image'
import { Theme } from '@material-ui/core'

export default Carousel
export function Carousel({ items, Image }: CarouselProps): ReactElement {
  return (
    <SliderStyled dots>
      {items.map((item) => (
        <ImageRing key={item.image.xs.src} as={Image} image={item.image} />
      ))}
    </SliderStyled>
  )
}

const SliderStyled = styled(Slider)`
  ${({ theme }: { theme: Theme }) => `
    .slick-arrow {
      color: white;
      background: white;
      border-radius: ${theme.spacing(5)}px;
      &:before {
        color: black;
      }
    }

    .slick-prev {
      left: ${theme.spacing(1)}px;
      z-index: 1;
    }
    .slick-next {
      right: ${theme.spacing(1)}px;
    }
`}
`
