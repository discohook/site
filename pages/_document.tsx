import "highlight.js"
import { useStaticRendering } from "mobx-react-lite"
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document"
import React from "react"
import { ServerStyleSheet } from "styled-components"

// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(true)

export default class MyDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const renderPage = context.renderPage

    try {
      context.renderPage = () =>
        renderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(context)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
