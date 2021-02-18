import { ReactElement, useReducer } from 'react'
import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import Badge from '@material-ui/core/Badge'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import LocalMallIcon from '@material-ui/icons/LocalMall'
import { useShoppingCart } from 'use-shopping-cart'
import type { Config } from 'types/config'
import NavigationMobile from 'components/molecules/NavigationMobile'
import LocaleSwitcher from 'components/molecules/LocaleSwitcher'
import Navigation from 'components/molecules/Navigation'
import Logo from 'components/molecules/Logo'

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

  return (
    <header>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Hidden smUp>
          <NavigationMobile
            config={config}
            menuStatus={state.menuStatus}
            openMenu={openMenu}
            closeMenu={closeMenu}
          />
        </Hidden>
        <Link href="/">
          <a>
            <Logo config={config} />
          </a>
        </Link>
        <Hidden xsDown>
          <Navigation config={config} />
        </Hidden>
        <div>
          <LocaleSwitcher />
          <IconButton onClick={openCart}>
            <Badge badgeContent={cartCount} color="primary">
              <LocalMallIcon />
            </Badge>
          </IconButton>
        </div>
      </Grid>
    </header>
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
