import { ReactElement, ReactNode, useReducer } from 'react'
import { useRouter } from 'next/router'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

import type { Config } from 'types/config'
import Meta from 'components/layouts/Meta'
import exitPreview from 'services/api/preview/exitPreview'
import theme from 'theme'
import Aside from './Aside'
import Header from './Header'
import Footer from './Footer'

const ContainerStyled = styled(Container)`
  display: flex;
  min-height: calc(100vh - 88px);
  flex-direction: column;
  margin-bottom: ${theme.spacing(6)}px;
`

type LayoutDefaultProps = {
  preview: boolean
  config: Config
  children: ReactNode
}

export default function LayoutDefault({
  preview,
  config,
  children,
}: LayoutDefaultProps): ReactElement {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, { cartStatus: 'CLOSED' })

  async function onClickExitPreview() {
    await exitPreview()

    router.reload()
  }

  function openCart() {
    dispatch({ type: 'OPEN_CART' })
  }

  function closeCart() {
    dispatch({ type: 'CLOSE_CART' })
  }

  return (
    <>
      <Meta />
      {preview && (
        <div>
          <Button onClick={onClickExitPreview}>Exit Preview</Button>
        </div>
      )}
      <ContainerStyled>
        <Header config={config} openCart={openCart} />
        <main>{children}</main>
      </ContainerStyled>

      <Container>
        <Footer config={config} />
      </Container>

      <Aside
        cartStatus={state.cartStatus}
        openCart={openCart}
        closeCart={closeCart}
      />
    </>
  )
}

type State = {
  cartStatus: 'OPEN' | 'CLOSED'
}

type Action =
  | {
      type: 'OPEN_CART'
    }
  | { type: 'CLOSE_CART' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OPEN_CART':
      return { ...state, cartStatus: 'OPEN' }

    case 'CLOSE_CART':
      return { ...state, cartStatus: 'CLOSED' }

    default:
      return state
  }
}
