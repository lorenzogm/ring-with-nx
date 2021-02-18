import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { ReactElement, useReducer, useRef } from 'react'
import ReactSelect from 'react-select'
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { RichText } from 'prismic-reactjs'
import Paper from '@material-ui/core/Paper'
import Image from 'components/atoms/Image'
import PageLayout from 'components/layouts/LayoutDefault/LayoutDefault'
import type { Config } from 'types/config'
import ColorSelector from 'components/molecules/ProductColorSelector'
import type { Product, Size } from 'types/product'
import type { Image as ImageType } from 'types/image'

type ProductTemplateProps = {
  preview: boolean
  config: Config
  product: Product
}

export default function ProductTemplate({
  preview,
  config,
  product,
}: ProductTemplateProps): ReactElement | null {
  const router = useRouter()
  const { addItem } = useShoppingCart()

  const fieldSelectSize = useRef<ReactSelect>(null)

  const [state, dispatch] = useReducer(reducer, {
    colorSelected: product && product.colorDefault ? product.colorDefault : '',
    imageSelected: product && product.imageDefault,
    sizeStatus: 'CLOSED',
  })

  if (!config || !product) {
    return null
  }

  if (!router.isFallback && !product) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <PageLayout preview={preview} config={config}>
      {router.isFallback ? null : (
        <>
          <article>
            <Head>
              <title>
                {product.name} | {config.siteName}
              </title>
            </Head>
            <section>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper>
                    <Image
                      src={state.imageSelected.url}
                      alt={state.imageSelected.alt || product.name}
                      width={state.imageSelected.dimensions.width}
                      height={state.imageSelected.dimensions.height}
                    />
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  {product.brand && (
                    <Box mb={2}>
                      <Typography>{product.brand}</Typography>
                    </Box>
                  )}

                  <Box mb={2}>
                    <Typography variant="h4" component="h1">
                      {product.name}
                    </Typography>
                  </Box>

                  <Box mb={4}>
                    <Typography variant="h5" component="p">
                      {formatCurrencyString({
                        value: product.price,
                        currency: config.currency,
                      })}
                    </Typography>
                  </Box>

                  {product.colors && (
                    <Box mb={4}>
                      <ColorSelector
                        product={product}
                        colorSelected={state.colorSelected}
                        onSelectColor={({ color, image }) => {
                          dispatch({
                            type: 'COLOR_SELECTED',
                            colorSelected: color,
                            imageSelected: image,
                          })
                        }}
                      />
                    </Box>
                  )}

                  {product.sizes && (
                    <Box mb={2}>
                      <ReactSelect
                        ref={fieldSelectSize}
                        options={product.sizes}
                        placeholder="Elige tu talla"
                        menuIsOpen={state.sizeStatus === 'OPEN'}
                        onChange={(size) => {
                          dispatch({
                            type: 'SIZE_SELECTED',
                            sizeSelected: (size as unknown) as Size,
                          })
                        }}
                        onMenuOpen={() => {
                          dispatch({
                            type: 'SIZE_OPEN',
                          })
                        }}
                        onMenuClose={() => {
                          dispatch({
                            type: 'SIZE_CLOSE',
                          })
                        }}
                      />
                    </Box>
                  )}

                  <Box mb={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => {
                        if (state.sizeSelected) {
                          addItem({
                            name: product.name,
                            sku: `${product.uid}-${state.colorSelected}-${state.sizeSelected.value}`,
                            price: product.price,
                            currency: config.currency,
                            image: state.imageSelected.url,
                            color: state.colorSelected,
                            size: state.sizeSelected.value,
                          })
                        } else {
                          if (fieldSelectSize && fieldSelectSize.current) {
                            fieldSelectSize.current.focus()
                          }

                          dispatch({
                            type: 'SIZE_OPEN',
                          })
                        }
                      }}
                    >
                      Añadir a la cesta
                    </Button>
                  </Box>

                  {product.description && (
                    <Box mb={2}>{RichText.render(product.description)}</Box>
                  )}
                </Grid>
              </Grid>
            </section>
          </article>
        </>
      )}
    </PageLayout>
  )
}

type State = {
  colorSelected: string
  imageSelected: ImageType
  sizeSelected?: Size
  sizeStatus: 'OPEN' | 'CLOSED'
}

type Action =
  | {
      type: 'COLOR_SELECTED'
      colorSelected: string
      imageSelected: ImageType
    }
  | { type: 'SIZE_SELECTED'; sizeSelected: Size }
  | { type: 'SIZE_OPEN' }
  | { type: 'SIZE_CLOSE' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'COLOR_SELECTED':
      return {
        ...state,
        imageSelected: action.imageSelected,
        colorSelected: action.colorSelected,
      }

    case 'SIZE_SELECTED':
      return {
        ...state,
        sizeSelected: action.sizeSelected,
        sizeStatus: 'CLOSED',
      }

    case 'SIZE_OPEN':
      return { ...state, sizeStatus: 'OPEN' }

    case 'SIZE_CLOSE':
      return { ...state, sizeStatus: 'CLOSED' }

    default:
      return state
  }
}
