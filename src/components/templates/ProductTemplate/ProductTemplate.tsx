import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { ReactElement, useState } from 'react'
import ReactSelect from 'react-select'
import { useShoppingCart } from 'use-shopping-cart'
import { RichText } from 'prismic-reactjs'

import PageLayout from 'components/foundations/PageLayout/PageLayout'
import Button from 'components/foundations/Button/Button'
import Divider from 'components/foundations/Divider/Divider'
import type { Config } from 'types/config'
import type { Product, Size } from 'types/product'

import ColorSelector from './ColorSelector'
import Price from './Price'
import type { State } from './ProductTemplate.d'

type ProductTemplateProps = {
  config: Config
  product: Product
}

export default function ProductTemplate({
  config,
  product,
}: ProductTemplateProps): ReactElement | null {
  const router = useRouter()
  const { addItem } = useShoppingCart()

  const [state, setState] = useState<State>({
    colorSelected: product ? product.colorDefault : '',
    imageSelected: product ? product.imageDefault : '',
  })

  if (!config || !product) {
    return null
  }

  if (!router.isFallback && !product) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <PageLayout config={config}>
      {router.isFallback ? null : (
        <>
          <article>
            <Head>
              <title>
                {product.name} | {config.siteName}
              </title>
            </Head>
            <section className="text-gray-700 body-font bg-white">
              <div className="container px-5 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                  <div className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200">
                    <img
                      src={state.imageSelected}
                      alt={product.name}
                      width={1080}
                      height={1080}
                    />
                  </div>

                  <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">
                      BRAND NAME
                    </h2>
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                      {product.name}
                    </h1>
                    <div className="mb-3">
                      <Price product={product} currency={config.currency} />
                    </div>

                    <p className="leading-relaxed mb-6">
                      {product.description
                        ? RichText.render(product.description)
                        : null}
                    </p>
                    <div className="mb-6">
                      <ColorSelector
                        product={product}
                        state={state}
                        setState={setState}
                      />
                    </div>
                    <div className="mb-6">
                      <ReactSelect
                        options={product.sizes}
                        placeholder="Elige tu talla"
                        onChange={(size) => {
                          setState((statePrevious) => ({
                            ...statePrevious,
                            sizeSelected: size as Size,
                          }))
                        }}
                      />
                    </div>
                    <Divider />
                    <div className="flex">
                      <div className="flex ml-auto">
                        <Button
                          variant="primary"
                          disabled={!state.sizeSelected}
                          onClick={() => {
                            if (state.sizeSelected) {
                              addItem({
                                name: product.name,
                                sku: `${product.slug}-${state.colorSelected}-${state.sizeSelected.value}`,
                                price: product.price,
                                currency: config.currency,
                                image: state.imageSelected,
                                color: state.colorSelected,
                                size: state.sizeSelected.value,
                              })
                            }
                          }}
                        >
                          Añadir al carrito
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </article>
        </>
      )}
    </PageLayout>
  )
}
