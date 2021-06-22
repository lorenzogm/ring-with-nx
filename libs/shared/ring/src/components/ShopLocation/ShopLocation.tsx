import { ReactElement } from 'react'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { useMediaQuery } from '@material-ui/core'
import { ShopLocationProps } from './index.d'
import Grid from '@material-ui/core/Grid'
import Title from '@ring/components/Title'
import ImageRing from '@ring/components/Image'
import Link from '../Link'

export default function ShopLocation({
  image,
  logo,
  address,
  email,
  phoneNumber,
  Image,
  link,
}: ShopLocationProps): ReactElement | null {
  const isMdOrGreater = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md'),
  )

  return (
    <Link href={link}>
      <Grid container direction="column" alignItems="center">
        {image ? <ImageRing image={image} as={Image} /> : null}
        {logo ? <ImageRing image={logo} as={Image} /> : null}
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
    </Link>
  )
}
