import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import { Container, Grid, Link, Typography } from '@ring/core/index'
import { styled } from '@ring/core/theme'
import { ReactElement } from 'react'

type HeaderProps = {
  activeStep: number
}

export function Header({ activeStep }: HeaderProps): ReactElement {
  const steps = ['Dirección', 'Pago', 'Confirmación', 'Hecho!']

  return (
    <>
      <HeaderWrapper>
        <Container>
          <Grid container justifyContent="space-between" alignItems="center">
            <Link href="/">-</Link>
            <Typography variant="h5" color="secondary">
              Pago seguro
            </Typography>
          </Grid>
        </Container>
      </HeaderWrapper>

      <StepperContainer>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <StepStyled key={label} $active={activeStep === index}>
              <StepLabelStyled active={activeStep === index}>
                {label}
              </StepLabelStyled>
            </StepStyled>
          ))}
        </Stepper>
      </StepperContainer>
    </>
  )
}

const HeaderWrapper = styled.header`
  ${({ theme }) => `
    background-color: ${theme.palette.grey[500]};
    padding: ${theme.spacing(2)}px;
  `}
`

const StepperContainer = styled(Container)`
  padding: 0;
`

const StepStyled = styled(Step)<{ $active: boolean }>`
  ${({ theme, $active }) => `
    ${theme.breakpoints.only('xs')} {
      ${$active === false ? `display: none` : ''}
    }
  `}
`

const StepLabelStyled = styled(StepLabel)`
  .MuiStepLabel-label {
    ${({ active }: { active: boolean }) => {
      return active ? 'font-size: 1.5rem' : ''
    }};
  }
`
