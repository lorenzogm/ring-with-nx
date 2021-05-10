import { ReactElement } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import type { Config } from 'types/config'
import Link from 'components/elements/Link'

const Category = styled(Typography)`
  &:hover {
    text-decoration: underline;
    text-underline-offset: ${({ theme }) => theme.spacing(1)}px;
  }
`

type NavigationProps = {
  config: Config
}

export default function Navigation({ config }: NavigationProps): ReactElement {
  return (
    <nav>
      <Grid container justify="center" spacing={3}>
        {config.navigation &&
          config.navigation.map((item) => {
            const prefix = item.type === 'category' ? '/store' : ''
            return (
              <Grid key={item.slug} item>
                <Link href={`${prefix}/${item.slug}`}>
                  <Category variant="subtitle1">{item.name}</Category>
                </Link>
              </Grid>
            )
          })}
      </Grid>
    </nav>
  )
}
