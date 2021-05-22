import styled from 'styled-components'
import { useRouter } from 'next/router'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Link from 'components/Link'
import 'services/firebase'

import useClientState from '../contexts/useClientState'
import useServerState from '../contexts/useServerState'

export default function Layout({ children }) {
  return (
    <Container>
      <CssBaseline />
      <Header />

      {children}
    </Container>
  )
}

function Header() {
  const [serverState] = useServerState()
  const [clientState, { selectYear }] = useClientState()
  const router = useRouter()

  return (
    <header>
      <Box mb={2}>
        <Typography variant="h1">Mustachian Tracker</Typography>
        <Typography>
          Track your wealth investing 5 minutes per month. Just edit the{' '}
          <a href="https://docs.google.com/spreadsheets/d/1JZYk8WtWEUulkN1T5B54RIgdTD3_ekQZqSUwcWqGf5o/edit?usp=sharing">
            spreadsheet
          </a>
          .
        </Typography>
      </Box>
      <nav>
        <Link href="/">Dashboard</Link>
        <Link href="/cash">Cash</Link>
        <Link href="/pillar-2">Pillar 2</Link>
        <Link href="/pillar-3a">Pillar 3a</Link>
      </nav>

      <DividerStyled />

      {router.asPath !== '/' ? (
        <Box mb={4}>
          {serverState.yearList.map((year) => (
            <Button
              key={year}
              variant={year === clientState.yearSelected ? 'contained' : 'text'}
              onClick={() => {
                selectYear(year)
              }}
            >
              {year}
            </Button>
          ))}
        </Box>
      ) : null}
    </header>
  )
}
const DividerStyled = styled(Divider)`
  ${({ theme }) => `
    margin: ${theme.spacing(2, 2)};
  `}
`
