import { Typography } from '@material-ui/core'
import { ReactElement } from 'react'
import Image from 'components/atoms/Image'
import type { Config } from 'types/config'

type LogoProps = { config: Config }

export default function Logo({ config }: LogoProps): ReactElement {
  return config.logo && config.logo.url ? (
    <Image
      src={config.logo.url}
      alt={config.siteName}
      width={config.logo.dimensions.width}
      height={config.logo.dimensions.height}
    />
  ) : (
    <Typography>{config.siteName}</Typography>
  )
}
