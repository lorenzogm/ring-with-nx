import { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

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
