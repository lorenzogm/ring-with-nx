import { ReactElement, ReactNode } from 'react'
import Container from '@material-ui/core/Container'

import Meta from 'components/layouts/Meta'
import CookieBanner from 'components/molecules/CookieBanner'

type LayoutBlankProps = {
  children: ReactNode
}
export default function LayoutBlank({
  children,
}: LayoutBlankProps): ReactElement {
  return (
    <>
      <Meta />

      <CookieBanner />

      <Container>
        <main>{children}</main>
      </Container>
    </>
  )
}
