import ContainerMui, {
  ContainerProps as ContainerMuiProps,
} from '@mui/material/Container'
import { shouldForwardProp, styled } from '@ring/ui/theme'
import { ReactElement } from 'react'

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

const ContainerStyled = styled(ContainerMui, { shouldForwardProp })<{
  disableMargins?: boolean
}>(
  ({ theme, disableMargins }) => `
    ${
      disableMargins
        ? ''
        : `
      padding-left: ${theme.spacing(theme.grid.margin.xs)};
      padding-right: ${theme.spacing(theme.grid.margin.xs)};

      ${theme.breakpoints.up('sm')} {
        padding-left: ${theme.spacing(theme.grid.margin.sm)};
        padding-right: ${theme.spacing(theme.grid.margin.sm)};
      }
      ${theme.breakpoints.up('md')} {
        padding-left: ${theme.spacing(theme.grid.margin.md)};
        padding-right: ${theme.spacing(theme.grid.margin.md)};
      }
      ${theme.breakpoints.up('lg')} {
        padding-left: ${theme.spacing(theme.grid.margin.lg)};
        padding-right: ${theme.spacing(theme.grid.margin.lg)};
      }
      ${theme.breakpoints.up('xl')} {
        padding-left: ${theme.spacing(theme.grid.margin.xl)};
        padding-right: ${theme.spacing(theme.grid.margin.xl)};
      }
      `
    }
  `,
)
