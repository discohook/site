import { render as _render, RenderOptions } from "@testing-library/react"
import type { ReactElement } from "react"
import { ContextWrapper } from "./ContextWrapper"

export const render = (ui: ReactElement, options?: RenderOptions) =>
  _render(ui, { wrapper: ContextWrapper, ...options })
