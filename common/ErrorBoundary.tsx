import React, { Component, ErrorInfo, ReactNode } from "react"
import { ErrorPage } from "./ErrorPage"

export type ErrorBoundaryProps = {
  children?: ReactNode
}

export type ErrorBoundaryState = {
  caughtError?: {
    error: Error
    info: ErrorInfo
  }
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {}

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ caughtError: { error, info } })
  }

  render() {
    const { children } = this.props
    const { caughtError } = this.state

    if (caughtError) {
      return <ErrorPage {...caughtError} />
    }

    return children
  }
}
