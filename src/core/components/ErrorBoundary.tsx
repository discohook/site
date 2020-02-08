import React, { Component, ErrorInfo, ReactNode } from "react"
import { ErrorPage } from "./ErrorPage"

export type ErrorBoundaryProps = {
  children?: ReactNode
}

export type ErrorBoundaryState = {
  error?: Error
  info?: ErrorInfo
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {}

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ error, info })
  }

  render() {
    if (this.state.error && this.state.info) {
      return <ErrorPage error={this.state.error} info={this.state.info} />
    }

    return this.props.children
  }
}
