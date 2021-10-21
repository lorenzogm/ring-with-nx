import 'normalize.css/normalize.css'

import { EmotionCache } from '@emotion/utils'
import { Image, Link } from '@ring/nextjs'
import { StripeProvider } from '@ring/store'
import { Header } from '@ring/storyblok'
import { EmotionProvider, ReactQueryProvider, RingProvider } from '@ring/ui'
import { AppProps } from 'next/dist/shared/lib/router/router'
import Head from 'next/head'
import { ReactElement } from 'react'

import { theme } from '../src/ui'
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function App({
  Component,
  emotionCache,
  pageProps,
}: MyAppProps): ReactElement {
  const { config, locale, locales, story } = pageProps

  return (
    <RingProvider
      components={{ Head, Header, Image, Link }}
      layout={{ header: config.data.story.content.header }}
      locale={locale}
      locales={locales}
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
      <EmotionProvider theme={theme} emotionCache={emotionCache}>
        <StripeProvider>
          <ReactQueryProvider>
            <Component
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...pageProps}
            />
          </ReactQueryProvider>
        </StripeProvider>
      </EmotionProvider>
    </RingProvider>
  )
}
