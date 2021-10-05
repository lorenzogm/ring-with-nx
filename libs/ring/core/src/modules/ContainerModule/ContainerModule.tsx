import { GridJustification } from '@material-ui/core'
import { Container, GridProps } from '@ring/core/index'
import { ReactElement } from 'react'
import styled from 'styled-components'

export type ContainerModuleProps = Pick<GridProps, 'justifyContent'> & {
  backgroundColor?: string
  children: ReactElement
  disableMargins?: boolean
  alignContent?: GridJustification
  mobileMarginBottom: number
  tabletMarginBottom: number
  laptopMarginBottom: number
}

export function ContainerModule({
  alignContent,
  backgroundColor,
  children,
  disableMargins,
  justifyContent,
  mobileMarginBottom,
  tabletMarginBottom,
  laptopMarginBottom,
}: ContainerModuleProps): ReactElement {
  return (
    <ContainerStyled
      alignContent={alignContent}
      disableMargins={disableMargins}
      justifyContent={justifyContent}
      mobileMarginBottom={mobileMarginBottom}
      tabletMarginBottom={tabletMarginBottom}
      laptopMarginBottom={laptopMarginBottom}
      $backgroundColor={backgroundColor}
    >
      {children}
    </ContainerStyled>
  )
}

const ContainerStyled = styled(Container)<{
  alignContent: ContainerModuleProps['alignContent']
  justifyContent: ContainerModuleProps['justifyContent']
  mobileMarginBottom: ContainerModuleProps['mobileMarginBottom']
  tabletMarginBottom: ContainerModuleProps['tabletMarginBottom']
  laptopMarginBottom: ContainerModuleProps['laptopMarginBottom']
  $backgroundColor: ContainerModuleProps['backgroundColor']
}>`
  ${({
    theme,
    alignContent,
    justifyContent,
    mobileMarginBottom,
    tabletMarginBottom,
    laptopMarginBottom,
    $backgroundColor,
  }) => `
    ${justifyContent ? `justify-content: ${justifyContent}` : ''};
    ${
      alignContent
        ? `
          flex-direction: column;
          justify-content: ${alignContent};
          height: 100%;
          `
        : ''
    }
    ${$backgroundColor ? `background-color: ${$backgroundColor};` : ''}
    display: flex;

    margin: ${theme.spacing(0, 0, mobileMarginBottom, 0)};

    ${theme.breakpoints.up('sm')} {
      margin: ${theme.spacing(0, 0, tabletMarginBottom, 0)};
    }

    ${theme.breakpoints.up('md')} {
      margin: ${theme.spacing(0, 0, laptopMarginBottom, 0)};
    }
  `}
`
