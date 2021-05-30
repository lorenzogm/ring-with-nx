import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  ${({ theme }: { theme: Theme }) => `
      body {
        background-color: ${theme.palette.background.default};
      }
  `}
`

export default GlobalStyle
