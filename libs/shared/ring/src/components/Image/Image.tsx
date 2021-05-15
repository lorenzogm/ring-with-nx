import styled from 'styled-components'
import { ImageProps } from './index.d'

export default Image
export function Image({ alt, as, src, width, height }: ImageProps) {
  const Component = as || 'img'

  return (
    <Container>
      <Component src={src} alt={alt} width={width} height={height} />
    </Container>
  )
}

const Container = styled.div`
  img {
    width: 100%;
    height: auto;
  }
`
