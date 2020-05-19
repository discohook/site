import { Observer } from "mobx-react-lite"
import "mobx-react-lite/batchingForReactDom"
import App, { AppProps } from "next/app"
import React from "react"
import { ThemeProvider } from "styled-components"
import { ErrorBoundary } from "../common/ErrorBoundary"
import { ModalManager } from "../common/modal/ModalManager"
import { ModalManagerProvider } from "../common/modal/ModalManagerContext"
import { ModalOverlay } from "../common/modal/ModalOverlay"
import { PopoverManager } from "../common/popover/PopoverManager"
import { PopoverManagerProvider } from "../common/popover/PopoverManagerContext"
import { PopoverOverlay } from "../common/popover/PopoverOverlay"
import { AppearanceManager } from "../common/style/AppearanceManager"
import { AppearanceManagerProvider } from "../common/style/AppearanceManagerContext"
import { GlobalStyle } from "../common/style/GlobalStyle"
import { resetNextId } from "../common/uid"

export default class MyApp extends App {
  private readonly appearanceManager = new AppearanceManager()
  private readonly modalManager = new ModalManager()
  private readonly popoverManager = new PopoverManager()

  private lastRoute: string

  constructor(props: Readonly<AppProps>) {
    super(props)

    if (typeof window === "undefined") {
      resetNextId()
    }

    this.lastRoute = props.router.route
  }

  shouldComponentUpdate(nextProps: Readonly<AppProps>) {
    const nextRoute = nextProps.router.route

    if (this.lastRoute === "/" && nextRoute === "/") {
      return false
    }

    this.lastRoute = nextRoute
    return true
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Observer>
        {() => (
          <ThemeProvider theme={this.appearanceManager.theme}>
            <GlobalStyle />
            <ErrorBoundary>
              <AppearanceManagerProvider value={this.appearanceManager}>
                <ModalManagerProvider value={this.modalManager}>
                  <PopoverManagerProvider value={this.popoverManager}>
                    <Component {...pageProps} />
                    <ModalOverlay />
                    <PopoverOverlay />
                  </PopoverManagerProvider>
                </ModalManagerProvider>
              </AppearanceManagerProvider>
            </ErrorBoundary>
          </ThemeProvider>
        )}
      </Observer>
    )
  }
}
