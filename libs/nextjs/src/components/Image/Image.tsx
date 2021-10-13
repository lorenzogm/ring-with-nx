import ImageNext, { ImageProps as ImageNextProps } from 'next/image'
import { ReactElement } from 'react'

export type ImageProps = ImageNextProps

export function Image(props: ImageProps): ReactElement {
  return <ImageNext {...props} />
}
