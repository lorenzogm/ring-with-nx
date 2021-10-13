import { Grid, GridProps } from '@ring/ui/components'
import { ReactElement, ReactNode } from 'react'

export type GridItemProps = {
  children: ReactNode
  xs?: GridProps['xs']
  sm?: GridProps['sm']
  md?: GridProps['md']
  lg?: GridProps['lg']
  xl?: GridProps['xl']
}

export function GridItem({
  children,
  xs,
  sm,
  md,
  lg,
  xl,
}: GridItemProps): ReactElement {
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      {children}
    </Grid>
  )
}
