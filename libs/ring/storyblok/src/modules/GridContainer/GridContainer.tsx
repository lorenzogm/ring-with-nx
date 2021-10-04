import { GridContainer as GridContainerRing } from '@ring/core/index'
import { DynamicComponent, GridContainerStoryblok } from '@ring/storyblok/index'
import { ReactElement } from 'react'

type GridContainerProps = GridContainerStoryblok

export function GridContainer({ items }: GridContainerProps): ReactElement {
  return (
    <GridContainerRing>
      {items.map((item) => (
        <DynamicComponent key={item._uid} content={item} />
      ))}
    </GridContainerRing>
  )
}
