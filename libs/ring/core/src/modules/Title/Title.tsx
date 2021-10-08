import { Typography, TypographyProps } from '@ring/core/index'
import { ContainerModule, ContainerModuleProps } from '@ring/core/modules'
import { styled } from '@ring/core/theme'
import { ReactElement } from 'react'

export type TitleProps = Pick<TypographyProps, 'align' | 'variant'> & {
  mobileMarginBottom: number
  tabletMarginBottom: number
  laptopMarginBottom: number
  title: string
  verticalAlign?: ContainerModuleProps['alignContent']
}

export function Title({
  align,
  mobileMarginBottom,
  tabletMarginBottom,
  laptopMarginBottom,
  title,
  variant,
  verticalAlign,
}: TitleProps): ReactElement {
  return (
    <ContainerModule
      disableMargins
      alignContent={verticalAlign}
      mobileMarginBottom={mobileMarginBottom}
      tabletMarginBottom={tabletMarginBottom}
      laptopMarginBottom={laptopMarginBottom}
    >
      <TypographyStyled variant={variant} align={align}>
        {title}
      </TypographyStyled>
    </ContainerModule>
  )
}

const TypographyStyled = styled(Typography)`
  width: 100%;
`
