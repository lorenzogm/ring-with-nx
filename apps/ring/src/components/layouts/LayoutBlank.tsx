import { ReactElement, ReactNode } from 'react'
import Container from '@material-ui/core/Container'

import Meta from 'components/layouts/Meta'
import CookieBanner from 'components/modules/CookieBanner'
import { Config } from 'types/config'

type LayoutBlankProps = {
  config: Config
  children: ReactNode
}
export default function LayoutBlank({
  config,
  children,
}: LayoutBlankProps): ReactElement {
  return (
    <>
      <Meta config={config} />

      <CookieBanner />

      <Container>
        <main>{children}</main>
      </Container>
    </>
  )
}
