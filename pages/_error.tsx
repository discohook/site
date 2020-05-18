import type { NextPageContext } from "next"
import React from "react"
import { ErrorPage } from "../common/ErrorPage"

export type ErrorProps = {
  statusCode?: number
}

export default function Error(props: ErrorProps) {
  const { statusCode } = props

  return <ErrorPage statusCode={statusCode} />
}

Error.getInitialProps = (context: NextPageContext): ErrorProps => {
  return {
    statusCode: context.res?.statusCode,
  }
}
