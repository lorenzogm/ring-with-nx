import { FC } from 'react'

export type ImageProps = {
  alt: string
  as?: FC<ImageProps>
  height: number
  src: string
  width: number
}

export type ImageParsed = Omit<ImageProps, 'as'>
