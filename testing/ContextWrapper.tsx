import React, { ReactNode } from "react"
import { ThemeProvider } from "styled-components"
import { ModalManager } from "../common/modal/ModalManager"
import { ModalManagerProvider } from "../common/modal/ModalManagerContext"
import { PopoverManager } from "../common/popover/PopoverManager"
import { PopoverManagerProvider } from "../common/popover/PopoverManagerContext"
import { useLazyValue } from "../common/state/useLazyValue"
import { AppearanceManager } from "../common/style/AppearanceManager"
import { AppearanceManagerProvider } from "../common/style/AppearanceManagerContext"

export function ContextWrapper(props: { children?: ReactNode }) {
  const { children } = props

  const appearanceManager = useLazyValue(() => new AppearanceManager())
  const modalManager = useLazyValue(() => new ModalManager())
  const popoverManager = useLazyValue(() => new PopoverManager())

  return (
    <ThemeProvider theme={appearanceManager.theme}>
      <AppearanceManagerProvider value={appearanceManager}>
        <ModalManagerProvider value={modalManager}>
          <PopoverManagerProvider value={popoverManager}>
            {children}
          </PopoverManagerProvider>
        </ModalManagerProvider>
      </AppearanceManagerProvider>
    </ThemeProvider>
  )
}
