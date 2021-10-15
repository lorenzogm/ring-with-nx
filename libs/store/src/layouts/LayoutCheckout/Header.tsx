import {
  Container,
  Grid,
  Link,
  Step,
  StepLabel,
  Stepper,
  styled,
  Typography,
} from '@ring/ui'
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
            <StepStyled key={label} active={activeStep === index}>
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
    padding: ${theme.spacing(2)};
  `}
`

const StepperContainer = styled(Container)`
  padding: 0;
`

const StepStyled = styled(Step)<{ active: boolean }>`
  ${({ theme, active }) => `
    ${theme.breakpoints.only('xs')} {
      ${active === false ? `display: none` : ''}
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
