import ImageNext from 'next/image'
import { ReactElement } from 'react'

type ImageProps = {
  src: string
  alt: string
  width: number
  height: number
}

export default function Image({
  src,
  alt,
  width,
  height,
}: ImageProps): ReactElement {
  return (
    <ImageNext
      className="object-contain"
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  )
}
