import { ImageModule as ImageModuleRing } from '@ring/core/index'
import { ImageStoryblok } from '@ring/storyblok/index'
import { ReactElement } from 'react'

type ImageProps = ImageStoryblok

export function Image({
  image,
  layout,
  objectFit,
  width,
  height,
}: ImageProps): ReactElement {
  const widthUpdated = useSize({ layout, size: width })
  const heightUpdated = useSize({ layout, size: height })
  return (
    <ImageModuleRing
      src={image.filename}
      alt={image.alt || image.filename}
      layout={layout}
      objectFit={objectFit === '' ? undefined : objectFit}
      width={widthUpdated}
      height={heightUpdated}
    />
  )
}

type UseSizeProps = {
  layout: ImageProps['layout']
  size: ImageProps['width'] | ImageProps['height']
}
function useSize({ layout, size }: UseSizeProps) {
  if (size === '') {
    if (layout === 'responsive') {
      return 1
    }

    return undefined
  }

  return size as number
}
