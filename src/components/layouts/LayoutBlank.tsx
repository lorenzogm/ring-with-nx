import { ReactElement, ReactNode } from 'react'
import CookieBanner from 'react-cookie-banner'
import Container from '@material-ui/core/Container'

import Meta from 'components/layouts/Meta'

type LayoutBlankProps = {
  children: ReactNode
}
export default function LayoutBlank({
  children,
}: LayoutBlankProps): ReactElement {
  return (
    <>
      <Meta />
      <Container>
        <main>{children}</main>
      </Container>
      <CookieBanner
        message="Hola, usamos cookies. Si sigues navegando significa que aceptas el uso de cookies."
        cookie="user-has-accepted-cookies"
        dismissOnScroll
        dismissOnClick
      />
    </>
  )
}
