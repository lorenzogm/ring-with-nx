import Grid from '@material-ui/core/Grid'
import { ReactElement } from 'react'
import Typography from '@material-ui/core/Typography'
import Navigation from 'components/modules/Navigation'
import type { Config } from 'types/config'

type FooterProps = {
  config: Config
}

export default function Footer({ config }: FooterProps): ReactElement {
  return (
    <footer>
      <Grid container justify="space-between" alignItems="center">
        <Typography>{config.siteName}</Typography>
        <Navigation config={config} />
      </Grid>
    </footer>
  )
}
