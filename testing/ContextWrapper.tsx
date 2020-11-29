import React, { ReactNode } from "react"
import { ThemeProvider } from "styled-components"
import { ModalManager } from "../common/modal/ModalManager"
import { ModalManagerProvider } from "../common/modal/ModalManagerContext"
import { PopoverManager } from "../common/popover/PopoverManager"
import { PopoverManagerProvider } from "../common/popover/PopoverManagerContext"
import { PreferenceManager } from "../common/settings/PreferenceManager"
import { PreferenceManagerProvider } from "../common/settings/PreferenceManagerContext"
import { useLazyValue } from "../common/state/useLazyValue"

export function ContextWrapper(props: { children?: ReactNode }) {
  const { children } = props

  const preferenceManager = useLazyValue(() => new PreferenceManager())
  const modalManager = useLazyValue(() => new ModalManager())
  const popoverManager = useLazyValue(() => new PopoverManager())

  return (
    <ThemeProvider theme={preferenceManager.theme}>
      <PreferenceManagerProvider value={preferenceManager}>
        <ModalManagerProvider value={modalManager}>
          <PopoverManagerProvider value={popoverManager}>
            {children}
          </PopoverManagerProvider>
        </ModalManagerProvider>
      </PreferenceManagerProvider>
    </ThemeProvider>
  )
}
