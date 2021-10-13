import { RingTheme } from '@ring/ui/theme'

import { colors } from '../colors'

export const MuiButton: RingTheme['overrides']['MuiButton'] = {
  root: {
    fontFamily: 'Corbel',
  },
  containedPrimary: {
    backgroundColor: colors('black'),
    '&:disabled': {
      backgroundColor: colors('grey-3'),
      color: colors('white'),
    },
    '&:hover': {
      backgroundColor: colors('grey-1'),
    },
  },
  containedSecondary: {
    backgroundColor: colors('white'),
    color: colors('black'),
    '&:disabled': {
      backgroundColor: colors('grey-1'),
      color: colors('black'),
    },
    '&:hover': {
      backgroundColor: colors('grey-1'),
    },
  },
  outlinedPrimary: {
    borderColor: colors('black'),
    color: colors('black'),
    '&:disabled': {
      borderColor: colors('grey-3'),
      color: colors('grey-3'),
    },
    '&:hover': {
      borderColor: colors('black'),
      backgroundColor: colors('grey-1'),
    },
  },
  outlinedSecondary: {
    borderColor: colors('white'),
    color: colors('white'),
    '&:disabled': {
      borderColor: colors('grey-1'),
      color: colors('grey-1'),
    },
    '&:hover': {
      backgroundColor: colors('grey-1'),
      borderColor: colors('white'),
    },
  },
}
