import { DynamicComponent, LinkExternalStoryblok } from '@ring/storyblok'
import { LinkExternal as LinkExternalRing } from '@ring/ui'
import { ReactElement } from 'react'

type LinkExternalProps = LinkExternalStoryblok & {
  mobileMarginBottom?: string
  tabletMarginBottom?: string
  laptopMarginBottom?: string
}

export function LinkExternal({
  href,
  items,
  target,
}: // mobileMarginBottom,
// tabletMarginBottom,
// laptopMarginBottom,
LinkExternalProps): ReactElement {
  // const mobileMarginBottomUpdated = useSpacing(mobileMarginBottom)
  // const tabletMarginBottomUpdated = useSpacing(tabletMarginBottom)
  // const laptopMarginBottomUpdated = useSpacing(laptopMarginBottom)

  return (
    <LinkExternalRing
      href={href}
      target={target}
      // mobileMarginBottom={mobileMarginBottomUpdated}
      // tabletMarginBottom={tabletMarginBottomUpdated}
      // laptopMarginBottom={laptopMarginBottomUpdated}
    >
      {items.map((item) => (
        <DynamicComponent key={item._uid} content={item} />
      ))}
    </LinkExternalRing>
  )
}
