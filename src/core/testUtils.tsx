import "@testing-library/jest-dom/extend-expect"
import { render as _render, RenderOptions } from "@testing-library/react"
import React, { ReactElement, ReactNode } from "react"
import { ThemeProvider } from "styled-components"
import { darkTheme } from "../appearance/themes"

export * from "@testing-library/react"
export { default as userEvent } from "@testing-library/user-event"

function ContextWrapper(props: { children?: ReactNode }) {
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

export const render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">,
) => _render(ui, { wrapper: ContextWrapper, ...options })
