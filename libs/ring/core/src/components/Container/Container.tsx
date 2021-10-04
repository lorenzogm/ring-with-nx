import ContainerMui, {
  ContainerProps as ContainerMuiProps,
} from '@material-ui/core/Container'
import styled from 'styled-components'

export type ContainerProps = ContainerMuiProps

export function Container({ children, ...props }: ContainerProps): JSX.Element {
  return (
    <ContainerStyled {...props} disableGutters maxWidth="xl">
      {children}
    </ContainerStyled>
  )
}

const ContainerStyled = styled(ContainerMui)`
  ${({ theme }) => `
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
  `}
`
