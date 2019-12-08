import React, { Component, ErrorInfo, ReactNode } from "react"
import ErrorPage from "./ErrorPage"

type Props = {
  children?: ReactNode
}

type State = {
  error?: Error
  info?: ErrorInfo
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {}

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
