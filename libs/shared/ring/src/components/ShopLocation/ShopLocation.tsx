import { ReactElement } from 'react'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { useMediaQuery } from '@material-ui/core'
import { ShopLocationProps } from './index.d'
import Grid from '@material-ui/core/Grid'
import Title from '@ring/components/Title'
import Image from '../Image'

export default function ShopLocation({
  image,
  logo,
  address,
  email,
  phoneNumber,
}: ShopLocationProps): ReactElement | null {
  const isMdOrGreater = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md'),
  )

  return (
    <Grid container direction="column" alignItems="center">
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
        />
      ) : null}
      {logo ? (
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
        />
      ) : null}
      {address ? (
        <Title
          variant={address.variant}
          text={address.text}
          align={isMdOrGreater ? 'center' : 'left'}
        />
      ) : null}
      {email ? (
        <Title
          variant={email.variant}
          text={email.text}
          align={isMdOrGreater ? 'center' : 'left'}
        />
      ) : null}
      {phoneNumber ? (
        <Title
          variant={phoneNumber.variant}
          text={phoneNumber.text}
          align={isMdOrGreater ? 'center' : 'left'}
        />
      ) : null}
    </Grid>
  )
}
