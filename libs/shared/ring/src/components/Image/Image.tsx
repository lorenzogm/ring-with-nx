import useMediaQueryGetCurrent from '@ring/hooks/useMediaQueryGetCurrent'
import styled from 'styled-components'
import { ImageProps } from './index.d'

export default Image
export function Image({ as, image }: ImageProps) {
  const Component = as || 'img'

  const mediaQuery = useMediaQueryGetCurrent()

  return (
    <Container>
      <Component
        src={image[mediaQuery].src}
        alt={image[mediaQuery].alt}
        width={image[mediaQuery].width}
        height={image[mediaQuery].height}
      />
    </Container>
  )
}

const Container = styled.div`
  img {
    width: 100%;
    height: auto;
  }
`
