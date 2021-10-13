import '@emotion/react'

import { RingTheme } from '@ring/ui'

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends RingTheme {}
}
