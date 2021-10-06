import { Box, Paper } from '@material-ui/core'
import {
  Grid,
  Image,
  Typography,
  useSelector,
  useToggle,
} from '@ring/core/index'
import { useRing } from '@ring/core/providers'
import { StoreProductStoryblok } from '@ring/storyblok/types'
import Head from 'next/head'
import { ReactElement, useRef } from 'react'
import ReactSelect from 'react-select'
import styled from 'styled-components'
import { formatCurrencyString } from 'use-shopping-cart'

import { ColorSelector } from './ColorSelector'

export type StoreProductTemplateProps = StoreProductStoryblok

export function StoreProductTemplate({
  brand,
  colorDefault,
  colors,
  imageDefault,
  name,
  price,
  sizes,
}: StoreProductTemplateProps): ReactElement | null {
  const { meta } = useRing()
  // const { cartDetails, addItem, incrementItem } = useShoppingCart()

  const fieldSelectSize = useRef(null)
  const [{ colorSelected, imageSelected }, { select: selectColor }] =
    useSelector<UseColorSelectorState>({
      colorSelected: colorDefault,
      imageSelected: imageDefault,
    })
  const [, { select: selectSize }] = useSelector<UseSizeSelectorState>({})

  const [
    sizeSelectorStatus,
    { open: openSizeSelector, close: closeSizeSelector },
  ] = useToggle()

  return (
    <article>
      <Head>
        <title>
          {name} | {meta.title}
        </title>
      </Head>
      <section>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Paper>
              <Image
                src={imageSelected.filename}
                alt={imageSelected.alt || name}
                layout="responsive"
                width={1}
                height={1}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            {brand && <Brand variant="subtitle1">{brand}</Brand>}

            <Name variant="h4" component="h1">
              {name}
            </Name>

            <Price variant="h5" component="p">
              {formatCurrencyString({
                value: price.number,
                currency: 'EUR',
              })}
            </Price>

            {colors && (
              <Box mb={2}>
                <ColorSelector
                  colors={colors}
                  colorSelected={colorSelected}
                  onSelectColor={selectColor}
                />
              </Box>
            )}

            {sizes && (
              <Box mb={2}>
                <ReactSelect
                  ref={fieldSelectSize}
                  options={sizes.map((size) => ({
                    value: size,
                    label: size,
                  }))}
                  placeholder="Elige tu talla"
                  menuIsOpen={sizeSelectorStatus === 'OPEN'}
                  onChange={(size) => {
                    if (size) {
                      selectSize({ sizeSelected: size.value })
                      closeSizeSelector()
                    }
                  }}
                  onMenuOpen={openSizeSelector}
                  onMenuClose={closeSizeSelector}
                />
              </Box>
            )}

            {/* <Box mb={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={addToCart}
              >
                Añadir a la cesta
              </Button>
            </Box> */}

            {/* {product.description && (
              <Box mb={2}>{RichText.render(product.description)}</Box>
            )} */}
          </Grid>
        </Grid>
      </section>
    </article>
  )

  // function addToCart() {
  //   const isPossibleToAddToTheCart =
  //     state.sizeSelected || product.sizes === undefined

  //   if (isPossibleToAddToTheCart) {
  //     let sku = ''
  //     let size
  //     if (state.sizeSelected) {
  //       size = state.sizeSelected.value
  //       sku = `${product.uid}-${state.colorSelected}-${size}`
  //     } else if (product.sizes === undefined) {
  //       sku = `${product.uid}-${state.colorSelected}`
  //     }

  //     if (
  //       Object.keys(cartDetails).find((productSlug) => productSlug === sku) ===
  //       undefined
  //     ) {
  //       addItem({
  //         name: product.name,
  //         sku,
  //         price: product.price,
  //         currency: config.currency,
  //         image: state.imageSelected.url,
  //         color: state.colorSelected,
  //         ...(size ? { size } : {}),
  //       })
  //     } else {
  //       incrementItem(sku)
  //     }
  //   } else {
  //     if (fieldSelectSize && fieldSelectSize.current) {
  //       fieldSelectSize.current.focus()
  //     }

  //     dispatch({
  //       type: 'SIZE_OPEN',
  //     })
  //   }
  // }
}

const Brand = styled(Typography)`
  ${({ theme }) => `
    margin-bottom: ${theme.spacing(4)}px;
  `}
`
const Name = styled(Typography)`
  ${({ theme }) => `
    margin-bottom: ${theme.spacing(2)}px;
  `}
`
const Price = styled(Typography)`
  ${({ theme }) => `
    margin-bottom: ${theme.spacing(2)}px;
  `}
`

type UseColorSelectorState = {
  colorSelected: StoreProductTemplateProps['colorDefault']
  imageSelected: StoreProductTemplateProps['imageDefault']
}

type UseSizeSelectorState = {
  sizeSelected?: Flatten<StoreProductTemplateProps['sizes']>
}

type Flatten<Type> = Type extends Array<infer Item> ? Item : Type
