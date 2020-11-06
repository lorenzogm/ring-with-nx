import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { ReactElement } from 'react'

import PageLayout from 'components/foundations/PageLayout/PageLayout'
import { Config } from 'services/CMS/config'
import { Product } from 'services/CMS/product'
import Image from 'components/foundations/Image/Image'
import Button from 'components/foundations/Button/Button'

type ProductTemplateProps = {
  preview: boolean
  config: Config
  product: Product
}

export default function ProductTemplate({
  preview,
  config,
  product,
}: ProductTemplateProps): ReactElement {
  const router = useRouter()

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
            <section className="text-gray-700 body-font overflow-hidden bg-white">
              <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                  <div className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200">
                    <Image
                      src={product.image}
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
                    <Reviews />

                    <p className="leading-relaxed">
                      {product.description || DESCRIPTION_DEFAULT}
                    </p>
                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                      <div className="flex">
                        <span className="mr-3">Color</span>
                        <button
                          type="button"
                          className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"
                        />
                        <button
                          type="button"
                          className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"
                        />
                        <button
                          type="button"
                          className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"
                        />
                      </div>
                      <div className="flex ml-6 items-center">
                        <span className="mr-3">Size</span>
                        <div className="relative">
                          <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                            <option>SM</option>
                            <option>M</option>
                            <option>L</option>
                            <option>XL</option>
                          </select>
                          <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                            >
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <span className="title-font font-medium text-2xl text-gray-900">
                        {product.price}
                      </span>
                      <div className="flex ml-auto">
                        <Button variant="primary">Add to cart</Button>
                      </div>
                      <button
                        type="button"
                        className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                      >
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                        </svg>
                      </button>
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

const DESCRIPTION_DEFAULT =
  'Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.'
