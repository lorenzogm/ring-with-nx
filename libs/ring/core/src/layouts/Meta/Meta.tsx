import { useRing } from '@ring/core/index'
import { ReactElement } from 'react'

export function Meta(): ReactElement | null {
  const { components, seo } = useRing()
  const { Head } = components

  if (Head) {
    return (
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />

        <meta property="og:image" content={seo.ogImage} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={seo.favicons['180']}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={seo.favicons['32']}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={seo.favicons['16']}
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href={seo.favicons['180']} color="#000000" />
        <link rel="shortcut icon" href={seo.favicons['180']} />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
    )
  }

  return null
}
