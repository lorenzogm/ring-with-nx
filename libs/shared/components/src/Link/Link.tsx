import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

type LinkProps = {
  onClick?: () => void
  children: ReactNode
}

export default function Link({ children, onClick }: LinkProps): ReactElement {
  return <LinkStyled onClick={onClick}>{children}</LinkStyled>
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
