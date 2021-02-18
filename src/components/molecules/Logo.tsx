import { Typography } from '@material-ui/core'
import { ReactElement } from 'react'
import Image from 'components/atoms/Image'
import type { Config } from 'types/config'

type LogoProps = { config: Config }

export default function Logo({ config }: LogoProps): ReactElement {
  return config.logo ? (
    <Image src={config.logo} alt={config.siteName} width={100} height={100} />
  ) : (
    <Typography>{config.siteName}</Typography>
  )
}
