import { Grid } from '@ring/core/components'
import { ReactElement, ReactNode } from 'react'

export type GridContainerProps = {
  children: ReactNode
}

export function GridContainer({ children }: GridContainerProps): ReactElement {
  return <Grid container>{children}</Grid>
}
