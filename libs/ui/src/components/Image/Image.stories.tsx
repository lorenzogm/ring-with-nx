import { Meta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'

import { Image } from './Image'
import { dataOne, dataThree, dataTwo } from './Image.mock'

export default {
  component: Image,
  title: 'Components/Image',
  decorators: [withDesign],
} as Meta

export function VariantOne(): JSX.Element {
  return (
    <Image {...dataOne} />
  )
}
export function VariantTwo(): JSX.Element {
  return (
    <Image {...dataTwo} />
  )
}
export function VariantThree(): JSX.Element {
  return (
    <Image {...dataThree} />
  )
}
