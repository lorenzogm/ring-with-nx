import { ContainerModule as ContainerRing } from '@ring/core/index'
import { ContainerStoryblok, DynamicComponent } from '@ring/storyblok/index'
import { ReactElement } from 'react'

type ContainerProps = ContainerStoryblok

export function Container({
  backgroundColor,
  items,
  justifyContent,
}: ContainerProps): ReactElement {
  return (
    <ContainerRing
      justifyContent={justifyContent}
      backgroundColor={backgroundColor}
    >
      {items.map((item) => (
        <DynamicComponent key={item._uid} content={item} />
      ))}
    </ContainerRing>
  )
}
