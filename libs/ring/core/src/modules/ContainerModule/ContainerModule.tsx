import { Container, Grid, GridProps } from '@ring/core/index'
import { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

export type ContainerModuleProps = Pick<GridProps, 'justifyContent'> & {
  backgroundColor: string
  children: ReactNode
}

export function ContainerModule({
  backgroundColor,
  children,
  justifyContent,
}: ContainerModuleProps): ReactElement {
  return (
    <ContainerStyled $backgroundColor={backgroundColor}>
      <Grid container justifyContent={justifyContent}>
        {children}
      </Grid>
    </ContainerStyled>
  )
}

const ContainerStyled = styled(Container)`
  ${({ $backgroundColor }: { $backgroundColor: string }) => `
    ${$backgroundColor && `background-color: ${$backgroundColor}`}
  `}
`
