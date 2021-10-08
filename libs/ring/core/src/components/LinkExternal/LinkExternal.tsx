import { styled } from '@ring/core/theme'
import { ReactElement, ReactNode } from 'react'

export type LinkExternalProps = {
  children: ReactNode
  href: string
  target?: '_blank'
}

export function LinkExternal({
  children,
  href,
  target,
}: LinkExternalProps): ReactElement {
  return (
    <LinkStyled href={href} target={target}>
      {children}
    </LinkStyled>
  )
}

const LinkStyled = styled.a`
  cursor: pointer;
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    color: inherit;
    text-decoration: none;
  }
`
