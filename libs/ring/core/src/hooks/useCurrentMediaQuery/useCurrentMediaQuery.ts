import { useMediaQuery } from '@material-ui/core'

import { RingTheme } from '../../theme'

export function useCurrentMediaQuery(): MediaQueries {
  const xs = useMediaQuery((theme: RingTheme) => theme.breakpoints.only('xs'))
  const sm = useMediaQuery((theme: RingTheme) => theme.breakpoints.only('sm'))
  const md = useMediaQuery((theme: RingTheme) => theme.breakpoints.only('md'))
  const lg = useMediaQuery((theme: RingTheme) => theme.breakpoints.only('lg'))

  if (xs) {
    return 'xs'
  }
  if (sm) {
    return 'sm'
  }
  if (md) {
    return 'md'
  }
  if (lg) {
    return 'lg'
  }

  return 'xl'
}

type MediaQueries = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
