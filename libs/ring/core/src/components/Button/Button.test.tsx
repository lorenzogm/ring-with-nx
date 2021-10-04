import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './Button.stories'

const { Variants } = composeStories(stories)

test('Button: Variants', () => {
  render(<Variants />)

  screen.getAllByRole('button', { name: 'Large Contained' })
  screen.getAllByRole('button', { name: 'Large Contained Disabled' })
  screen.getAllByRole('button', { name: 'Large Outlined' })
  screen.getAllByRole('button', { name: 'Large Outlined Disabled' })

  screen.getAllByRole('button', { name: 'Small Contained' })
  screen.getAllByRole('button', { name: 'Small Contained Disabled' })
  screen.getAllByRole('button', { name: 'Small Outlined' })
  screen.getAllByRole('button', { name: 'Small Outlined Disabled' })
})
