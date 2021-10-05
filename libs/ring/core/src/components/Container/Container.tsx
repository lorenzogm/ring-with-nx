import ContainerMui, {
  ContainerProps as ContainerMuiProps,
} from '@material-ui/core/Container'
import { ReactElement } from 'react'
import styled from 'styled-components'

export type ContainerProps = ContainerMuiProps & {
  disableMargins?: boolean
}

export function Container({
  children,
  disableMargins,
  ...props
}: ContainerProps): ReactElement {
  return (
    <ContainerStyled {...props} disableGutters disableMargins={disableMargins}>
      {children}
    </ContainerStyled>
  )
}

const ContainerStyled = styled(ContainerMui)<{ disableMargins?: boolean }>`
  ${({ theme, disableMargins }) => `
    ${
      disableMargins
        ? ''
        : `
          padding-left: ${theme.spacing(theme.grid.margin.xs)}px;
          padding-right: ${theme.spacing(theme.grid.margin.xs)}px;

          ${theme.breakpoints.up('sm')} {
            padding-left: ${theme.spacing(theme.grid.margin.sm)}px;
            padding-right: ${theme.spacing(theme.grid.margin.sm)}px;
          }
          ${theme.breakpoints.up('md')} {
            padding-left: ${theme.spacing(theme.grid.margin.md)}px;
            padding-right: ${theme.spacing(theme.grid.margin.md)}px;
          }
          ${theme.breakpoints.up('lg')} {
            padding-left: ${theme.spacing(theme.grid.margin.lg)}px;
            padding-right: ${theme.spacing(theme.grid.margin.lg)}px;
          }
          ${theme.breakpoints.up('xl')} {
            padding-left: ${theme.spacing(theme.grid.margin.xl)}px;
            padding-right: ${theme.spacing(theme.grid.margin.xl)}px;
          }
    `
    }
  `}
`
