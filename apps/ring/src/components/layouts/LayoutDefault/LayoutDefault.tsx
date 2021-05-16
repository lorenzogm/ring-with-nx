import { ReactElement, ReactNode, useReducer } from 'react'
import { useRouter } from 'next/router'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

import type { Config } from 'types/config'
import Meta from 'components/layouts/Meta'
import exitPreview from 'services/api/preview/exitPreview'
import CookieBanner from 'components/modules/CookieBanner'
import { ImageParsed, ImageData, ImageProps } from '@ring/components/Image'
import Aside from './Aside'
import Header from './Header'
import Footer from './Footer'
import useMediaQueryGetCurrent from '@ring/hooks/useMediaQueryGetCurrent'
import Grid from '@ring/components/Grid'

const ContainerStyled = styled(Container)`
  display: flex;
  min-height: calc(100vh - 88px);
  flex-direction: column;
  margin-bottom: ${({ theme }) => `${theme.spacing(6)}px`};
`

const Background = styled.div<{ imageBackground: ImageData }>`
  background-image: ${({ imageBackground }) =>
    imageBackground && `url(${imageBackground.src})`};
  background-size: 100% 300px;
  background-repeat: no-repeat;
`

type LayoutDefaultProps = {
  Image: ImageProps['as']
  preview: boolean
  config: Config
  children: ReactNode
  imageBackground?: ImageParsed | null
}

export default function LayoutDefault({
  Image,
  preview,
  config,
  children,
  imageBackground,
}: LayoutDefaultProps): ReactElement {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, { cartStatus: 'CLOSED' })

  const mediaQuery = useMediaQueryGetCurrent()

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
  console.log(config.header)
  return (
    <Background
      imageBackground={imageBackground && imageBackground[mediaQuery]}
    >
      <Meta />
      {preview && (
        <div>
          <Button onClick={onClickExitPreview}>Exit Preview</Button>
        </div>
      )}

      <CookieBanner />

      <ContainerStyled maxWidth="lg">
        {config.header.map((section, index) => (
          <Grid
            key={index.toString()}
            Image={Image}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...section}
          />
        ))}
        {/* <Header config={config} openCart={openCart} /> */}
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
    </Background>
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
