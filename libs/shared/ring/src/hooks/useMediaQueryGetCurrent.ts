import { Theme, useMediaQuery } from '@material-ui/core'

export default function useMediaQueryGetCurrent() {
  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'), {
    noSsr: true,
  })
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.only('sm'), {
    noSsr: true,
  })
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.only('md'), {
    noSsr: true,
  })
  const lg = useMediaQuery((theme: Theme) => theme.breakpoints.only('lg'), {
    noSsr: true,
  })

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
