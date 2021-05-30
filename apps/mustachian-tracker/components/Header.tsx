import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Typography from '@material-ui/core/Typography'
import Link from 'components/Link'
import useServerState from 'contexts/useServerState'
import { ReactElement } from 'react'
import styled from 'styled-components'

export default function Header(): ReactElement {
  const [serverState] = useServerState()

  return (
    <header>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link href="/overview">
          <Typography variant="body1">Mustachian Tracker</Typography>
        </Link>
        <nav>
          <Link href="/overview">Overview</Link>
          <Link href="/my-data">My Data</Link>
          <Link href="/cash">Cash</Link>
          <Link href="/pillar-2">Pillar 2</Link>
          <Link href="/pillar-3a">Pillar 3a</Link>
        </nav>
        {serverState.user && serverState.user.id ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </Box>

      <DividerStyled />
    </header>
  )

  function logout() {
    serverState.user.signOut().catch((e) => {
      throw e
    })
  }
}
const DividerStyled = styled(Divider)`
  ${({ theme }: { theme: Theme }) => `
    margin: ${theme.spacing(2, 2)};
  `}
`
