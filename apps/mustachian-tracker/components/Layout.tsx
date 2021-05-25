import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { AuthAction, withAuthUser } from 'next-firebase-auth'
import Header from './Header'

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Layout)
function Layout({ children }) {
  return (
    <Container>
      <CssBaseline />
      <Header />

      {children}
    </Container>
  )
}
