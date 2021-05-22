import { forwardRef } from 'react'
import styled from 'styled-components'
import Link from '@material-ui/core/Link'
import { Theme } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { LinkProps } from './index.d'

export default forwardRef(
  (
    { href, onClick, text, startIcon, endIcon, variant = 'link' }: LinkProps,
    ref,
  ) => {
    return (
      <LinkStyled href={href} onClick={onClick} variantType={variant}>
        {startIcon && <IconStart>{startIcon}</IconStart>}
        {text}
        {endIcon && <IconEnd>{endIcon}</IconEnd>}
      </LinkStyled>
    )
  },
)

const LinkStyled = styled(Link)<{
  theme: Theme
  variantType: LinkProps['variant']
}>`
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

  display: flex;
  align-items: center;

  font-size: 1.3em;

  ${({ theme, variantType }) => `
    padding: ${theme.spacing(1, 1)};
    ${
      variantType === 'link' &&
      `background-color: ${theme.palette.background.paper};`
    }
  `}
`

const IconStart = styled(Icon)`
  ${({ theme }) => `
    margin-right: ${theme.spacing(1)}px;
  `}
`

const IconEnd = styled(Icon)`
  ${({ theme }) => `
    margin-left: ${theme.spacing(1)}px;
  `}
`
