import { Container, Grid, MediaQueryInfo } from '@ring/core/components'
import { useKeyPress } from '@ring/core/hooks'
import { styled } from '@ring/core/theme'

export function VisualGrid(): JSX.Element | null {
  const { isToggled } = useKeyPress()

  if (isToggled) {
    return (
      <>
        <ContainerStyled>
          <GridStyled container justifyContent="center" wrap="nowrap">
            {Array.from({ length: 12 }).map((_, index) => (
              <GridItemStyled key={index.toString()} item md={4} sm={6} xs={12}>
                <DivStyled>&nbsp;</DivStyled>
              </GridItemStyled>
            ))}
          </GridStyled>
        </ContainerStyled>
        <MediaQueryInfo />
      </>
    )
  }

  return null
}

const ContainerStyled = styled(Container)`
  position: fixed;
  top: 0;
  height: 100vh;
  z-index: 9;
  pointer-events: none;
`

const GridStyled = styled(Grid)`
  border-left: 1px solid lime;
  border-right: 1px solid lime;
  height: 100vh;
  padding: 0;
  margin: 0;
`

const GridItemStyled = styled(Grid)`
  opacity: 0.1;
  && {
    padding-top: 0;
    padding-bottom: 0;
  }
`

const DivStyled = styled.div`
  height: 100%;
  background-color: fuchsia;
`
