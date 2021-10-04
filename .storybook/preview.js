import { withMuiTheme } from '@harelpls/storybook-addon-materialui'
import { withTests } from '@storybook/addon-jest'
import { StyledComponentsProvider } from 'ui/providers/StyledComponentsProvider'

import results from '../.jest-test-results.json'

// this decorator makes the theme available for styled-components
// however, it needs to be improved to support multiple themes and switch between them
// an addon is required or we need to create our own decorator
const withThemeProvider = (Story) => {
  return (
    <StyledComponentsProvider theme={blueTheme}>
      <Story />
    </StyledComponentsProvider>
  )
}

export const decorators = [
  withTests({
    results,
  }),
  ...(process.env.NODE_ENV === 'test'
    ? []
    : [
        withMuiTheme({
          'Blue Theme': blueTheme,
          'Green Theme': greenTheme,
          'Marron Theme': marronTheme,
          'Purple Theme': purpleTheme,
          'Teal Theme': tealTheme,
          'Yellow Theme': yellowTheme,
        }),
      ]),
  withThemeProvider,
  ,
]

const customViewports = {
  iPhone8: {
    name: 'xs, 375 (eg. iPhone 8)',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
  iPhone11: {
    name: 'xs, 414 (eg. iPhone 11)',
    styles: {
      width: '414px',
      height: '896px',
    },
  },
  just600: {
    name: 'sm, 600',
    styles: {
      width: '600px',
      height: '800px',
    },
  },
  ipad: {
    name: 'sm, 768 (eg. iPad)',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  just960: {
    name: 'md, 960',
    styles: {
      width: '960px',
      height: '1280px',
    },
  },
  just1280: {
    name: 'lg, 1280',
    styles: {
      width: '1280px',
      height: '1024px',
    },
  },
  just1920: {
    name: 'xl, 1920',
    styles: {
      width: '1920px',
      height: '1024px',
    },
  },
}

export const parameters = {
  viewport: {
    viewports: customViewports,
  },
}
