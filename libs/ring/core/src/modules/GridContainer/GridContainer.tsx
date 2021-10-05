import { Grid } from '@ring/core/components'
import { ContainerModule } from '@ring/core/index'
import { ReactElement, ReactNode } from 'react'

export type GridContainerProps = {
  children: ReactNode
  mobileMarginBottom: number
  tabletMarginBottom: number
  laptopMarginBottom: number
}

export function GridContainer({
  children,
  mobileMarginBottom,
  tabletMarginBottom,
  laptopMarginBottom,
}: GridContainerProps): ReactElement {
  return (
    <ContainerModule
      disableMargins
      mobileMarginBottom={mobileMarginBottom}
      tabletMarginBottom={tabletMarginBottom}
      laptopMarginBottom={laptopMarginBottom}
    >
      <Grid container>{children}</Grid>
    </ContainerModule>
  )
}
