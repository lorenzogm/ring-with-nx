import 'normalize.css/normalize.css'

import { RingProvider } from '@ring/core/index'
import { Image, Link } from '@ring/nextjs/index'
import { Header } from '@ring/storyblok/index'
import { AppProps } from 'next/dist/shared/lib/router/router'
import { ReactElement } from 'react'

import { blueTheme } from '../src/ui'

export default function App({ Component, pageProps }: AppProps): ReactElement {
  const { locale, locales, story } = pageProps

  if (!story) {
    return null
  }

  return (
    <RingProvider
      components={{ Header, Image, Link }}
      layout={{ header: story.content.header }}
      locale={locale}
      locales={locales}
      theme={blueTheme}
      seo={{
        title: 'Ring',
        description: 'Ring with Storyblok',
        ogImage: '',
        favicons: {
          16: '',
          32: '',
          180: '',
        },
      }}
    >
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...pageProps}
      />
    </RingProvider>
  )
}
