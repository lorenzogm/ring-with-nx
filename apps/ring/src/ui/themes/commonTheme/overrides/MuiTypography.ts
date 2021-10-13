import { RingTheme } from '@ring/ui/theme'

import { colors } from '../colors'

export const MuiTypography: RingTheme['overrides']['MuiTypography'] = {
  colorPrimary: {
    color: colors('black'),
  },
  colorTextPrimary: {
    color: colors('black'),
  },
  colorSecondary: {
    color: colors('white'),
  },
  colorTextSecondary: {
    color: colors('white'),
  },
}
