import { ContainerModule, Image } from '@ring/ui'
import { styled } from '@ring/ui/theme'
import { ReactElement } from 'react'
import CarouselMui from 'react-material-ui-carousel'

type CarouselProps = {
  items: Array<{ src: string; alt: string }>
  mobileMarginBottom: number
  tabletMarginBottom: number
  laptopMarginBottom: number
}

export function Carousel({
  items,
  mobileMarginBottom,
  tabletMarginBottom,
  laptopMarginBottom,
}: CarouselProps): ReactElement {
  return (
    <ContainerModule
      disableMargins
      mobileMarginBottom={mobileMarginBottom}
      tabletMarginBottom={tabletMarginBottom}
      laptopMarginBottom={laptopMarginBottom}
    >
      <Wrapper>
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
      </Wrapper>
    </ContainerModule>
  )
}

const Wrapper = styled.div`
  margin-top: 12px;
  width: 100%;
`
