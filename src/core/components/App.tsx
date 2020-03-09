import { useObserver } from "mobx-react-lite"
import React from "react"
import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "../../appearance/components/GlobalStyle"
import { ModalOverlay } from "../../modal/components/ModalOverlay"
import { PopoverOverlay } from "../../popover/components/PopoverOverlay"
import { useAutorun } from "../../state/hooks/useAutorun"
import { useStores } from "../../state/hooks/useStores"
import { setUrlToMessage } from "../helpers/setUrlToMessage"
import { Body } from "./Body"

export function App() {
  const { appearanceStore, messageStore } = useStores()

  useAutorun(() => {
    setUrlToMessage(messageStore.message.getMessageData())
  })

  const theme = useObserver(() => appearanceStore.theme)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Body />
      <ModalOverlay />
      <PopoverOverlay />
    </ThemeProvider>
  )
}
