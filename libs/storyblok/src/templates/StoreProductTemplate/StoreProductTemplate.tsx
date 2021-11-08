import { StoreProductTemplate as StoreProductRingTemplate } from '@ring/store'
import { StoreProductStoryblok } from '@ring/storyblok/types'
import { ReactElement } from 'react'

export type StoreProductTemplateProps = StoreProductStoryblok

export function StoreProductTemplate({
  brand,
  colorDefault,
  colors,
  disabled,
  name,
  price,
  type,
}: StoreProductTemplateProps): ReactElement {
  const product = {
    brand,
    colorDefault,
    colors: colors
      ? colors.map(({ color, image }) => ({
          color,
          image: { src: image.filename, alt: image.alt },
        }))
      : undefined,
    disabled,
    name,
    price: price ? price.number : 0,
    type,
  }

  return <StoreProductRingTemplate product={product} />
}
