import Container from '@material-ui/core/Container'
import { ReactElement, ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}
export default function Layout({ children }: LayoutProps): ReactElement {
  return <Container>{children}</Container>
}
