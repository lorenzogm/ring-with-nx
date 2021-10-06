import { useRing } from '@ring/core/index'
import { ReactElement } from 'react'

export function Meta(): ReactElement | null {
  const { components, meta } = useRing()
  const { Head } = components

  if (Head) {
    return (
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />

        <meta property="og:image" content={meta.openGraphImage} />

        {/* <!-- generics --> */}
        <link rel="icon" href={meta.favicons.favicon} />
        <link rel="icon" href={meta.favicons.favicon16} sizes="16x16" />
        <link rel="icon" href={meta.favicons.favicon32} sizes="32x32" />
        {/* <link rel="icon" href="/path/to/favicon-57.png" sizes="57x57" />
        <link rel="icon" href="/path/to/favicon-76.png" sizes="76x76" />
        <link rel="icon" href="/path/to/favicon-96.png" sizes="96x96" />
        <link rel="icon" href="/path/to/favicon-128.png" sizes="128x128" /> */}
        <link
          rel="icon"
          href={meta.favicons.androidChrome192}
          sizes="192x192"
        />
        {/* <link rel="icon" href="/path/to/favicon-228.png" sizes="228x228" /> */}

        {/* <!-- Android --> */}
        {/* <link
          rel="shortcut icon"
          href="/path/to/favicon-196.png"
          sizes="196x196"
        /> */}

        {/* <!-- iOS --> */}
        {/* <link
          rel="apple-touch-icon"
          href="/path/to/favicon-120.png"
          sizes="120x120"
        />
        <link
          rel="apple-touch-icon"
          href="path/to/favicon-152.png"
          sizes="152x152"
        /> */}
        <link
          rel="apple-touch-icon"
          href={meta.favicons.appleTouchIcon}
          sizes="180x180"
        />

        {/* <!-- Windows 8 IE 10--> */}
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        {/* <meta
          name="msapplication-TileImage"
          content="/path/to/favicon-144.png"
        /> */}

        {/* <!— Windows 8.1 + IE11 and above —> */}
        {/* <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-square70x70logo" content="favicon-128.png" />
        <meta
          name="msapplication-square150x150logo"
          content="favicon-270.png"
        />
        <meta name="msapplication-TileImage" content="favicon-270.png" />
        <meta name="msapplication-config" content="none" /> */}

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
    )
  }

  return null
}
