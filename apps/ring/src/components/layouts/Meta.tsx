import Head from 'next/head'
import { ReactElement } from 'react'
import { Config } from 'types/config'

type MetaProps = {
  config: Config
}

export default function Meta({ config }: MetaProps): ReactElement {
  return (
    <Head>
      <title>{config.seo.title}</title>
      <meta name="description" content={config.seo.description} />

      <meta property="og:image" content={config.seo.ogImage} />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={config.seo.favicon.url}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={config.seo.favicon['32'].url}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={config.seo.favicon['16'].url}
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href={config.seo.favicon.url} color="#000000" />
      <link rel="shortcut icon" href={config.seo.favicon.url} />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Head>
  )
}
