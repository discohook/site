import React, { ReactNode } from "react"
import { ThemeProvider } from "styled-components"
import { DARK_THEME } from "../../appearance/constants/darkTheme"
import { ManagerProvider } from "../../state/contexts/ManagerContext"

export function ContextWrapper(props: { children?: ReactNode }) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <ManagerProvider value={(global as any).manager}>
      <ThemeProvider
        theme={{
          ...DARK_THEME,
          appearance: {
            color: "dark",
            display: "cozy",
            fontSize: 16,
            mobile: false,
          },
        }}
      >
        {props.children}
      </ThemeProvider>
    </ManagerProvider>
  )
}
