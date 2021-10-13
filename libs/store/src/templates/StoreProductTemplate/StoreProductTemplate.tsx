import { StoreProduct, StoreProductColor } from '@ring/store'
import {
  Box,
  Button,
  Grid,
  Image,
  Paper,
  Typography,
  useToggle,
} from '@ring/ui'
import { useRing } from '@ring/ui/providers'
import { styled } from '@ring/ui/theme'
import Head from 'next/head'
import { ReactElement, useRef, useState } from 'react'
import ReactSelect from 'react-select'
import slugify from 'slugify'
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'

import { ColorSelector } from './ColorSelector'
import { sizesMapping } from './sizes'

export type StoreProductTemplateProps = {
  product: StoreProduct
}

export function StoreProductTemplate({
  product,
}: StoreProductTemplateProps): ReactElement | null {
  const { meta } = useRing()
  const { cartDetails, addItem, incrementItem } = useShoppingCart()

  const sizeSelectedRef = useRef(null)
  const [{ colorSelected, imageSelected }, selectColor] =
    useState<UseColorSelectorState>({
      colorSelected: product.colorDefault,
      imageSelected: product.imageDefault,
    })
  const [{ sizeSelected }, selectSize] = useState<UseSizeSelectorState>({})

  const [
    sizeSelectorStatus,
    { open: openSizeSelector, close: closeSizeSelector },
  ] = useToggle()

  const sizes = product.type ? sizesMapping[product.type] : null

  return (
    <>
      <Head>
        <title>
          {product.name} | {meta.title}
        </title>
      </Head>
      <article>
        <section>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Paper>
                <Image
                  src={imageSelected.src}
                  alt={imageSelected.alt || product.name}
                  layout="responsive"
                  width={1}
                  height={1}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              {product.brand && (
                <Brand variant="subtitle1">{product.brand}</Brand>
              )}

              <Name variant="h4">{product.name}</Name>

              <Price variant="h5">
                {formatCurrencyString({
                  value: product.price,
                  currency: 'EUR',
                })}
              </Price>

              {product.colors && (
                <Box mb={2}>
                  <ColorSelector
                    colors={product.colors}
                    colorSelected={colorSelected}
                    onSelectColor={selectColor}
                  />
                </Box>
              )}

              {sizes && (
                <Box mb={2}>
                  <ReactSelect
                    ref={sizeSelectedRef}
                    options={sizes}
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

              <Box mb={2}>
                <Button fullWidth onClick={addToCart}>
                  Añadir a la cesta
                </Button>
              </Box>

              {/* {product.description && (
              <Box mb={2}>{RichText.render(product.description)}</Box>
            )} */}
            </Grid>
          </Grid>
        </section>
      </article>
    </>
  )

  function addToCart() {
    const isPossibleToAddToTheCart = sizeSelected || sizes === undefined
    if (isPossibleToAddToTheCart) {
      let sku = `${slugify(product.name.toUpperCase().replace('-', '_'), {
        replacement: '_',
      })}-${colorSelected}`
      if (sizeSelected) {
        sku += `-${sizeSelected}`
      }

      if (
        Object.keys(cartDetails).find((productSlug) => productSlug === sku) ===
        undefined
      ) {
        addItem({
          name: product.name,
          sku,
          price: product.price,
          currency: 'EUR',
          image: imageSelected.src,
          color: colorSelected,
          ...(sizeSelected ? { size: sizeSelected } : {}),
        })
      } else {
        incrementItem(sku)
      }
    } else {
      if (sizeSelectedRef && sizeSelectedRef.current) {
        sizeSelectedRef.current.focus()
      }
      openSizeSelector()
    }
  }
}

const Brand = styled(Typography)`
  ${({ theme }) => `
    margin-bottom: ${theme.spacing(4)};
  `}
`
const Name = styled(Typography)`
  ${({ theme }) => `
    margin-bottom: ${theme.spacing(2)};
  `}
`
const Price = styled(Typography)`
  ${({ theme }) => `
    margin-bottom: ${theme.spacing(2)};
  `}
`

type UseColorSelectorState = {
  colorSelected: StoreProductColor['color']
  imageSelected: StoreProductColor['image']
}

type UseSizeSelectorState = {
  sizeSelected?: string
}
