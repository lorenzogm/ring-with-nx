import { ContainerModule, LinkExternal } from '@ring/core/index'
import { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

export type LinkExternalModuleProps = {
  mobileMarginBottom: number
  tabletMarginBottom: number
  laptopMarginBottom: number
  children: ReactNode
  href: string
  target?: '_blank'
}

export function LinkExternalModule({
  mobileMarginBottom,
  tabletMarginBottom,
  laptopMarginBottom,
  children,
  href,
  target,
}: LinkExternalModuleProps): ReactElement {
  return (
    <ContainerModule
      disableMargins
      mobileMarginBottom={mobileMarginBottom}
      tabletMarginBottom={tabletMarginBottom}
      laptopMarginBottom={laptopMarginBottom}
    >
      <LinkExternalStyled href={href} target={target}>
        {children}
      </LinkExternalStyled>
    </ContainerModule>
  )
}

const LinkExternalStyled = styled(LinkExternal)`
  width: 100%;
`
