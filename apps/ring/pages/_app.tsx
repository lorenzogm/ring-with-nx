import 'normalize.css/normalize.css'

import { RingProvider, StripeProvider } from '@ring/core/index'
import { Image, Link } from '@ring/nextjs/index'
import { Header } from '@ring/storyblok/index'
import { AppProps } from 'next/dist/shared/lib/router/router'
import Head from 'next/head'
import { ReactElement } from 'react'

import { blueTheme } from '../src/ui'

export default function App({ Component, pageProps }: AppProps): ReactElement {
  const { config, locale, locales, story } = pageProps

  return (
    <RingProvider
      components={{ Head, Header, Image, Link }}
      layout={{ header: config.data.story.content.header }}
      locale={locale}
      locales={locales}
      theme={blueTheme}
      meta={{
        title: story?.content.metaTitle || config.data.story.content.metaTitle,
        description:
          story?.content.metaDescription ||
          config.data.story.content.metaDescription,
        openGraphImage:
          story?.content.metaOpenGraphImage?.filename ||
          config.data.story.content.metaOpenGraphImage,
        favicons: config.data.story.content.favicons,
      }}
    >
      <StripeProvider>
        <Component
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...pageProps}
        />
      </StripeProvider>
    </RingProvider>
  )
}
