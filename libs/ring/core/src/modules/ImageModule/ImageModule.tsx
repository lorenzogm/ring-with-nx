import {
  Image as ImageRing,
  ImageProps as ImageRingProps,
} from '@ring/core/components'
import { styled } from '@ring/core/theme'
import { ReactElement } from 'react'

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
