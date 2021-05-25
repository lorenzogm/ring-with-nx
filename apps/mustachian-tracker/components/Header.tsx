import styled from 'styled-components'
import { ReactElement } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { useAuthUser } from 'next-firebase-auth'
import Link from 'components/Link'

export default function Header(): ReactElement {
  const user = useAuthUser()

  return (
    <header>
      <Box mb={2}>
        <Typography variant="h1">Mustachian Tracker</Typography>
        <Typography>
          Track your wealth with only 5 minutes per month. Just add the balance
          at the end of the month of your assets.
        </Typography>
      </Box>
      <nav>
        <Link href="/">Dashboard</Link>
        <Link href="/cash">Cash</Link>
        <Link href="/pillar-2">Pillar 2</Link>
        <Link href="/pillar-3a">Pillar 3a</Link>
        {user.id ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </nav>

      <DividerStyled />
    </header>
  )

  function logout() {
    user.signOut()
  }
}
const DividerStyled = styled(Divider)`
  ${({ theme }) => `
    margin: ${theme.spacing(2, 2)};
  `}
`
