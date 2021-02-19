import { ReactElement } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import styled from 'styled-components'
import type { Config } from 'types/config'
import theme from 'theme'
import Logo from 'components/molecules/Logo'
import Link from 'components/atoms/Link'

const HeaderWrapper = styled.header`
  background-color: ${theme.palette.grey[500]};
`

const StepLabelStyled = styled(StepLabel)`
  .MuiStepLabel-label {
    ${({ active }: { active: boolean }) => {
      return active ? 'font-size: 1.5rem' : ''
    }};
  }
`

type HeaderProps = {
  config: Config
  activeStep: number
}

export default function Header({
  config,
  activeStep,
}: HeaderProps): ReactElement {
  const steps = ['Dirección', 'Pago', 'Confirmación', 'Hecho!']

  return (
    <>
      <HeaderWrapper>
        <Container>
          <Grid container justify="space-between" alignItems="center">
            <Link href="/">
              <Logo config={config} />
            </Link>
            <Typography variant="h5" color="secondary">
              Pago seguro
            </Typography>
          </Grid>
        </Container>
      </HeaderWrapper>

      <Container style={{ width: '100%' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabelStyled active={activeStep === index}>
                {label}
              </StepLabelStyled>
            </Step>
          ))}
        </Stepper>
      </Container>
    </>
  )
}
