import "@testing-library/jest-dom/extend-expect"
import React, { ReactNode } from "react"
import { ThemeProvider } from "styled-components"
import { DARK_THEME } from "../../appearance/constants/darkTheme"

export function ContextWrapper(props: { children?: ReactNode }) {
  return (
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
  )
}
