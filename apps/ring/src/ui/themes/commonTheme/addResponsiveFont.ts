import { RingTheme } from '@ring/ui'

export function addResponsiveFont(theme: RingTheme): RingTheme {
  return {
    ...theme,
    typography: {
      ...theme.typography,
      h1: {
        ...theme.typography.h1,
        fontSize: '42px',
        lineHeight: '120%',
        fontFeatureSettings: `'pnum' on, 'lnum' on`,
        [theme.breakpoints.up('lg')]: {
          fontSize: '75px',
          lineHeight: '110%',
        },
      },
      h2: {
        ...theme.typography.h2,
        fontSize: '35px',
        lineHeight: '110%',
        fontFeatureSettings: `'pnum' on, 'lnum' on`,
        [theme.breakpoints.up('lg')]: {
          fontSize: '60px',
          lineHeight: '120%',
        },
      },
      h3: {
        ...theme.typography.h3,
        fontSize: '30px',
        lineHeight: '120%',
        fontFeatureSettings: `'pnum' on, 'lnum' on`,
        [theme.breakpoints.up('lg')]: {
          fontSize: '48px',
          lineHeight: '120%',
        },
      },
      h4: {
        ...theme.typography.h4,
        fontSize: '28px',
        lineHeight: '120%',
        fontFeatureSettings: `'pnum' on, 'lnum' on`,
        [theme.breakpoints.up('lg')]: {
          fontSize: '40px',
          lineHeight: '120%',
        },
      },
      h5: {
        ...theme.typography.h5,
        fontSize: '24px',
        lineHeight: '120%',
        fontFeatureSettings: `'pnum' on, 'lnum' on`,
        [theme.breakpoints.up('lg')]: {
          fontSize: '32px',
          lineHeight: '120%',
        },
      },
      h6: {
        ...theme.typography.h6,
        fontSize: '21px',
        lineHeight: '120%',
        fontFeatureSettings: `'pnum' on, 'lnum' on`,
        [theme.breakpoints.up('lg')]: {
          fontSize: '24px',
          lineHeight: '120%',
        },
      },
      body1: {
        ...theme.typography.body1,
        fontSize: '16px',
        lineHeight: '150%',
        fontFeatureSettings: `'pnum' on, 'lnum' on`,
        [theme.breakpoints.up('lg')]: {
          fontSize: '18px',
          lineHeight: '150%',
        },
      },
      body2: {
        ...theme.typography.body2,
        fontSize: '18px',
        lineHeight: '150%',
        fontFeatureSettings: `'pnum' on, 'lnum' on`,
        [theme.breakpoints.up('lg')]: {
          fontSize: '21px',
          lineHeight: '150%',
        },
      },
      caption: {
        ...theme.typography.caption,
        fontSize: '16px',
        lineHeight: '140%',
        fontFeatureSettings: `'pnum' on, 'lnum' on`,
        [theme.breakpoints.up('lg')]: {
          fontSize: '16px',
          lineHeight: '150%',
        },
      },
    },
  }
}
