import { ContainerModule as ContainerRing } from '@ring/core/index'
import { useSpacing } from '@ring/storyblok/hooks'
import { ContainerStoryblok, DynamicComponent } from '@ring/storyblok/index'
import { ReactElement } from 'react'

type ContainerProps = ContainerStoryblok & {
  mobileMarginBottom?: string
  tabletMarginBottom?: string
  laptopMarginBottom?: string
}

export function Container({
  backgroundColor,
  items,
  justifyContent,
  mobileFlexDirection,
  mobileMarginBottom,
  tabletFlexDirection,
  tabletMarginBottom,
  laptopFlexDirection,
  laptopMarginBottom,
}: ContainerProps): ReactElement {
  const mobileMarginBottomUpdated = useSpacing(mobileMarginBottom)
  const tabletMarginBottomUpdated = useSpacing(tabletMarginBottom)
  const laptopMarginBottomUpdated = useSpacing(laptopMarginBottom)

  return (
    <ContainerRing
      backgroundColor={backgroundColor}
      justifyContent={justifyContent}
      mobileMarginBottom={mobileMarginBottomUpdated}
      mobileFlexDirection={mobileFlexDirection}
      tabletMarginBottom={tabletMarginBottomUpdated}
      tabletFlexDirection={tabletFlexDirection}
      laptopMarginBottom={laptopMarginBottomUpdated}
      laptopFlexDirection={laptopFlexDirection}
    >
      <>
        {items.map((item) => (
          <DynamicComponent key={item._uid} content={item} />
        ))}
      </>
    </ContainerRing>
  )
}
