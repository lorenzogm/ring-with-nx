import { Meta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'

import { StorybookBox } from '../StorybookBox'
import { Button } from './Button'

export default {
  component: Button,
  title: 'Components/Button',
  decorators: [withDesign],
} as Meta

export function Variants(): JSX.Element {
  return (
    <>
      <StorybookBox title="Primary">
        <StorybookBox row>
          <Button>Large Contained</Button>
          <Button disabled>Large Contained Disabled</Button>
          <Button variant="outlined">Large Outlined</Button>
          <Button variant="outlined" disabled>
            Large Outlined Disabled
          </Button>
        </StorybookBox>

        <StorybookBox row>
          <Button size="small">Small Contained</Button>
          <Button size="small" disabled>
            Small Contained Disabled
          </Button>
          <Button variant="outlined" size="small">
            Small Outlined
          </Button>
          <Button variant="outlined" size="small" disabled>
            Small Outlined Disabled
          </Button>
        </StorybookBox>
      </StorybookBox>

      <StorybookBox title="Secondary" backgroundColor="black">
        <StorybookBox row>
          <Button color="secondary">Large Contained</Button>
          <Button color="secondary" disabled>
            Large Contained Disabled
          </Button>
          <Button variant="outlined" color="secondary">
            Large Outlined
          </Button>
          <Button variant="outlined" color="secondary" disabled>
            Large Outlined Disabled
          </Button>
        </StorybookBox>

        <StorybookBox row>
          <Button size="small" color="secondary">
            Small Contained
          </Button>
          <Button size="small" color="secondary" disabled>
            Small Contained Disabled
          </Button>
          <Button variant="outlined" size="small" color="secondary">
            Small Outlined
          </Button>
          <Button variant="outlined" size="small" color="secondary" disabled>
            Small Outlined Disabled
          </Button>
        </StorybookBox>
      </StorybookBox>
    </>
  )
}

Variants.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/dsNSbWxOkuYf6jd5Id7Qio/Design-Concept?node-id=138%3A324',
  },
}
