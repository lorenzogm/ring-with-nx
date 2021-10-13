import { TitleStoryblok } from '@ring/storyblok'
import { useSpacing } from '@ring/storyblok/hooks'
import { Title as TitleRing } from '@ring/ui'
import { ReactElement } from 'react'

type TitleProps = TitleStoryblok & {
  mobileMarginBottom?: string
  tabletMarginBottom?: string
  laptopMarginBottom?: string
}

export function Title({
  align,
  mobileMarginBottom,
  tabletMarginBottom,
  laptopMarginBottom,
  title,
  variant,
  verticalAlign,
}: TitleProps): ReactElement {
  const mobileMarginBottomUpdated = useSpacing(mobileMarginBottom)
  const tabletMarginBottomUpdated = useSpacing(tabletMarginBottom)
  const laptopMarginBottomUpdated = useSpacing(laptopMarginBottom)

  return (
    <TitleRing
      align={align}
      mobileMarginBottom={mobileMarginBottomUpdated}
      tabletMarginBottom={tabletMarginBottomUpdated}
      laptopMarginBottom={laptopMarginBottomUpdated}
      title={title}
      variant={variant}
      verticalAlign={verticalAlign}
    />
  )
}
