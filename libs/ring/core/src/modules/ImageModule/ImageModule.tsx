import {
  Image as ImageRing,
  ImageProps as ImageRingProps,
} from '@ring/core/components'
import { ReactElement } from 'react'
import styled from 'styled-components'

export type ImageModuleProps = ImageRingProps

export function ImageModule({
  src,
  alt,
  layout,
  objectFit,
  width,
  height,
}: ImageModuleProps): ReactElement {
  return (
    <Wrapper>
      <ImageRing
        src={src}
        alt={alt}
        layout={layout}
        objectFit={objectFit}
        width={width}
        height={height}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`
