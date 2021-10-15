import { Container, GridProps } from '@ring/ui'
import { styled } from '@ring/ui/theme'
import { ReactElement } from 'react'

export type ContainerModuleProps = Pick<GridProps, 'justifyContent'> & {
  backgroundColor?: string
  children: ReactElement
  disableMargins?: boolean
  alignContent?: 'center' | 'flex-end' | 'flex-start' | 'justify'
  mobileFlexDirection?: 'row' | 'column'
  mobileMarginBottom: number
  tabletFlexDirection?: 'row' | 'column'
  tabletMarginBottom: number
  laptopFlexDirection?: 'row' | 'column'
  laptopMarginBottom: number
}

export function ContainerModule({
  alignContent,
  backgroundColor,
  children,
  disableMargins,
  justifyContent,
  mobileFlexDirection,
  mobileMarginBottom,
  tabletFlexDirection,
  tabletMarginBottom,
  laptopFlexDirection,
  laptopMarginBottom,
}: ContainerModuleProps): ReactElement {
  return (
    <ContainerStyled
      disableMargins={disableMargins}
      $alignContent={alignContent}
      $backgroundColor={backgroundColor}
      $justifyContent={justifyContent}
      $mobileMarginBottom={mobileMarginBottom}
      $mobileFlexDirection={mobileFlexDirection}
      $tabletMarginBottom={tabletMarginBottom}
      $tabletFlexDirection={tabletFlexDirection}
      $laptopMarginBottom={laptopMarginBottom}
      $laptopFlexDirection={laptopFlexDirection}
    >
      {children}
    </ContainerStyled>
  )
}

const ContainerStyled = styled(Container)<{
  $alignContent: ContainerModuleProps['alignContent']
  $backgroundColor: ContainerModuleProps['backgroundColor']
  $justifyContent: ContainerModuleProps['justifyContent']
  $mobileFlexDirection: ContainerModuleProps['mobileFlexDirection']
  $mobileMarginBottom: ContainerModuleProps['mobileMarginBottom']
  $tabletFlexDirection: ContainerModuleProps['tabletFlexDirection']
  $tabletMarginBottom: ContainerModuleProps['tabletMarginBottom']
  $laptopFlexDirection: ContainerModuleProps['laptopFlexDirection']
  $laptopMarginBottom: ContainerModuleProps['laptopMarginBottom']
}>(
  ({
    theme,
    $alignContent,
    $backgroundColor,
    $justifyContent,
    $mobileFlexDirection,
    $mobileMarginBottom,
    $tabletFlexDirection,
    $tabletMarginBottom,
    $laptopFlexDirection,
    $laptopMarginBottom,
  }) => `
    display: flex;

    ${$backgroundColor ? `background-color: ${$backgroundColor};` : ''}
    ${$justifyContent ? `justify-content: ${$justifyContent}` : ''};
    ${
      $alignContent
        ? `
          flex-direction: column;
          justify-content: ${$alignContent};
          height: 100%;
          `
        : ''
    }

    ${$mobileFlexDirection ? `flex-direction: ${$mobileFlexDirection}` : ''};
    margin: ${theme.spacing(0, 0, $mobileMarginBottom, 0)};

    ${theme.breakpoints.up('sm')} {
      ${$tabletFlexDirection ? `flex-direction: ${$tabletFlexDirection}` : ''};
      margin: ${theme.spacing(0, 0, $tabletMarginBottom, 0)};
    }

    ${theme.breakpoints.up('md')} {
      ${$laptopFlexDirection ? `flex-direction: ${$laptopFlexDirection}` : ''};
      margin: ${theme.spacing(0, 0, $laptopMarginBottom, 0)};
    }
  `,
)
