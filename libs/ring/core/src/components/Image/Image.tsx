import React from 'react'

import { useRing } from '../../providers'

export type ImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  layout: 'fill' | 'responsive'
  objectFit?: 'cover' | 'contain'
  unoptimized?: boolean
}

export function Image({
  src,
  alt,
  width,
  height,
  layout,
  objectFit,
}: ImageProps): JSX.Element | null {
  const { components } = useRing()
  const { Image: ImageRing } = components

  // TODO: use error boundary but first  fix an error in console (class/function or built-in message)
  //       add checks in sitecore for required fields
  if (!src) {
    // eslint-disable-next-line no-console
    console.error('No src for image with alt', alt)
    return null
  }

  if (!ImageRing) {
    // eslint-disable-next-line no-console
    console.error('ImageRing is undefined, please check RingProvider')
    return null
  }

  return (
    <ImageRing
      src={src}
      alt={alt}
      width={width}
      height={height}
      layout={layout}
      objectFit={objectFit}
    />
  )
}
