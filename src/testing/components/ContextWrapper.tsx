import "@testing-library/jest-dom/extend-expect"
import React, { ReactNode } from "react"
import { ThemeProvider } from "styled-components"
import { darkTheme } from "../../appearance/themes/darkTheme"

export function ContextWrapper(props: { children?: ReactNode }) {
  return (
    <ThemeProvider
      theme={{
        ...darkTheme,
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
