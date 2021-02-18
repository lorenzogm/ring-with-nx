import { ReactElement } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import type { Config } from 'types/config'
import Image from 'components/atoms/Image'

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
    <header>
      <Grid container>
        <Grid container justify="space-between">
          {config.logo ? (
            <Image
              src={config.logo}
              alt={config.siteName}
              width={100}
              height={100}
            />
          ) : (
            config.siteName
          )}
          <Typography>Pago seguro</Typography>
        </Grid>

        <Grid container justify="center">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
    </header>
  )
}
