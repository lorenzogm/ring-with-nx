import { render, screen } from '@testing-library/react'

import { Variants } from './Typography.stories'

// const { Variants } = composeStories(stories)

test('Typography: Variants', () => {
  render(<Variants />)

  screen.getByText('H1 Corbel bold 75/110')
})
