import LinkNext, { LinkProps as LinkNextProps } from 'next/link'
import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

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

type LinkProps = LinkNextProps & {
  onClick?: () => void
  children: ReactNode
}

export default function Link({
  children,
  onClick,
  ...rest
}: LinkProps): ReactElement {
  return (
    <LinkNext
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      passHref
    >
      <LinkStyled onClick={onClick}>{children}</LinkStyled>
    </LinkNext>
  )
}
