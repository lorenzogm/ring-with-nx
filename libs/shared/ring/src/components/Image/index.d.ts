import { FC } from 'react'

export type ImageProps = {
  as?: FC<ImageData>
  image: ImageParsed
}

export type ImageParsed = {
  xs: ImageData
  sm: ImageData
  md: ImageData
  lg: ImageData
  xl: ImageData
}

export type ImageData = {
  alt: string
  height: number
  src: string
  width: number
}
