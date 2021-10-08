import { createTheme } from './commonTheme'
import { colors } from './commonTheme/colors'

export const blueTheme = createTheme({
  palette: {
    primary: {
      main: colors('black'),
    },
  },
})
