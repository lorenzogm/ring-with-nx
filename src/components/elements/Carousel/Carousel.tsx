import { ReactElement, useRef } from 'react'
import Glider, { GliderMethods } from 'react-glider'
import Image from 'components/foundations/Image/Image'
import type { SliceCarousel } from 'types/slices'

import 'glider-js/glider.min.css'

type CarouselProps = ({
  items,
}: {
  items: SliceCarousel['items']
}) => ReactElement

const Carousel: CarouselProps = ({ items }) => {
  const gliderRef = useRef<GliderMethods>(null)
  return (
    <Glider ref={gliderRef} hasArrows hasDots slidesToShow={1}>
      {items.map((item) => (
        <Image
          key={item.image.url}
          src={item.image.url}
          alt={item.image.alt}
          width={item.image.width}
          height={item.image.height}
        />
      ))}
    </Glider>
  )
}

export default Carousel
