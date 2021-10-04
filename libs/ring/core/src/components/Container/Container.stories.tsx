import { Meta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'

import { Container } from './Container'

export default {
  component: Container,
  title: 'Components/Container',
  decorators: [withDesign],
} as Meta

export function Default(): JSX.Element {
  return <Container>Container</Container>
}
