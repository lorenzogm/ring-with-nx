import Document, { Html, Head, Main, NextScript } from 'next/document'
import React, { ReactElement } from 'react'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles'

import { Gtag } from '@ring/ui'

export default class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html>
        <Head>
          <Gtag trackingId={process.env.TRACKING_ID} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const styledComponentSheet = new StyledComponentSheets()
  const materialUiSheets = new MaterialUiServerStyleSheets()
  const originalRenderPage = ctx.renderPage
  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          styledComponentSheet.collectStyles(
            // eslint-disable-next-line react/jsx-props-no-spreading
            materialUiSheets.collect(<App {...props} />),
          ),
      })
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: [
        <React.Fragment key="styles">
          {initialProps.styles}
          {materialUiSheets.getStyleElement()}
          {styledComponentSheet.getStyleElement()}
        </React.Fragment>,
      ],
    }
  } finally {
    styledComponentSheet.seal()
  }
}
