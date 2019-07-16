import { Component, ErrorInfo, ReactNode } from "react"

type Props = {
  children: ReactNode
  onError: (error: Error, info: ErrorInfo) => ReactNode | void
}

type State = {
  error?: Error
  info?: ErrorInfo
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {}

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({
      error,
      info,
    })
  }

  componentDidUpdate(_prevProps: Readonly<Props>, prevState: Readonly<State>) {
    if (prevState.error) this.setState({ error: undefined, info: undefined })
  }

  render() {
    const { children, onError } = this.props
    const { error, info } = this.state

    return !error ? children : onError(error, info!) || null
  }
}
