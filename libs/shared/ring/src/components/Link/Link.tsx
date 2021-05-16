import { ReactNode, forwardRef } from 'react'
import styled from 'styled-components'

type LinkProps = {
  onClick?: () => void
  children: ReactNode
}

export default forwardRef(({ children, onClick }: LinkProps, ref) => {
  return <LinkStyled onClick={onClick}>{children}</LinkStyled>
})

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
