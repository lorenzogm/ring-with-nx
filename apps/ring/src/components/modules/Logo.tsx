import { Typography } from '@material-ui/core'
import { ReactElement } from 'react'
import Image from 'components/elements/Image'
import type { Config } from 'types/config'

type LogoProps = { config: Config }

export default function Logo({ config }: LogoProps): ReactElement {
  return config.logo && config.logo.url ? (
    <Image
      src={config.logo.url}
      alt={config.siteName}
      width={200}
      height={170}
    />
  ) : (
    <Typography variant="h5" component="p">
      {config.siteName}
    </Typography>
  )
}
