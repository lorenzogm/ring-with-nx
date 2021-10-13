import { GridSpacing } from '@mui/material/Grid'

import { useRingTheme } from '../../theme'
import { useCurrentMediaQuery } from '../useCurrentMediaQuery'

type SpacingProps = {
  gutter: GridSpacing
  margin: number
}

export function useSpacing(): SpacingProps {
  const mediaQuery = useCurrentMediaQuery()
  const theme = useRingTheme()

  return {
    gutter: theme.grid.gutter[mediaQuery],
    margin: theme.grid.margin[mediaQuery],
  }
}
