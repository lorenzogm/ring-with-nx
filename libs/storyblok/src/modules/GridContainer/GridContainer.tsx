import { DynamicComponent, GridContainerStoryblok } from '@ring/storyblok'
import { useSpacing } from '@ring/storyblok/hooks'
import { GridContainer as GridContainerRing } from '@ring/ui'
import { ReactElement } from 'react'

type GridContainerProps = GridContainerStoryblok & {
  mobileMarginBottom?: string
  tabletMarginBottom?: string
  laptopMarginBottom?: string
}

export function GridContainer({
  items,
  mobileMarginBottom,
  tabletMarginBottom,
  laptopMarginBottom,
}: GridContainerProps): ReactElement {
  const mobileMarginBottomUpdated = useSpacing(mobileMarginBottom)
  const tabletMarginBottomUpdated = useSpacing(tabletMarginBottom)
  const laptopMarginBottomUpdated = useSpacing(laptopMarginBottom)

  return (
    <GridContainerRing
      mobileMarginBottom={mobileMarginBottomUpdated}
      tabletMarginBottom={tabletMarginBottomUpdated}
      laptopMarginBottom={laptopMarginBottomUpdated}
    >
      {items.map((item) => (
        <DynamicComponent key={item._uid} content={item} />
      ))}
    </GridContainerRing>
  )
}
