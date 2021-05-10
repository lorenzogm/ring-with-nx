import { ReactElement, useReducer } from 'react'
import Grid from '@material-ui/core/Grid'
import Badge from '@material-ui/core/Badge'
import Hidden from '@material-ui/core/Hidden'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import LocalMallIcon from '@material-ui/icons/LocalMall'
import { useShoppingCart } from 'use-shopping-cart'
import type { Config } from 'types/config'
import NavigationMobile from 'components/modules/NavigationMobile'
import LocaleSwitcher from 'components/modules/LocaleSwitcher'
import Navigation from 'components/modules/Navigation'
import Logo from 'components/modules/Logo'
import Link from 'components/elements/Link'

const { CONFIG_STORE } = process.env

const HeaderStyled = styled.header`
  padding-top: ${({ theme }) => `${theme.spacing(1)}px`};
  padding-bottom: ${({ theme }) => `${theme.spacing(2)}px`};
`

type HeaderProps = {
  config: Config
  openCart: () => void
}

export default function Header({
  config,
  openCart,
}: HeaderProps): ReactElement {
  const { cartCount } = useShoppingCart()
  const [state, dispatch] = useReducer(reducer, { menuStatus: 'CLOSED' })

  function openMenu() {
    dispatch({ type: 'MENU_OPEN' })
  }
  function closeMenu() {
    dispatch({ type: 'MENU_CLOSE' })
  }

  const withNavigation = config.navigation.length > 0

  return (
    <HeaderStyled>
      <Grid
        container
        direction="row"
        justify={withNavigation ? 'space-between' : 'center'}
        alignItems="center"
      >
        {withNavigation && (
          <Hidden smUp>
            <NavigationMobile
              config={config}
              menuStatus={state.menuStatus}
              openMenu={openMenu}
              closeMenu={closeMenu}
            />
          </Hidden>
        )}
        <Link href="/">
          <Logo config={config} />
        </Link>
        {withNavigation && (
          <Hidden xsDown>
            <Navigation config={config} />
          </Hidden>
        )}
        {CONFIG_STORE === 'ENABLED' && (
          <div>
            <LocaleSwitcher />
            <IconButton onClick={openCart}>
              <Badge badgeContent={cartCount} color="primary">
                <LocalMallIcon />
              </Badge>
            </IconButton>
          </div>
        )}
      </Grid>
    </HeaderStyled>
  )
}

type State = {
  menuStatus: 'OPEN' | 'CLOSED'
}

type Action =
  | {
      type: 'MENU_OPEN'
    }
  | { type: 'MENU_CLOSE' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'MENU_OPEN':
      return { ...state, menuStatus: 'OPEN' }

    case 'MENU_CLOSE':
      return { ...state, menuStatus: 'CLOSED' }

    default:
      return state
  }
}
