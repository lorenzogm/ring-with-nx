import Container from '@material-ui/core/Container'
import { ReactElement, ReactNode } from 'react'

import Header from '../Header'

type LayoutProps = {
  children: ReactNode
}
export default function Layout({ children }: LayoutProps): ReactElement {
  return (
    <Container>
      <Header />

      {children}
    </Container>
  )
}
