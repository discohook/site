import "@testing-library/jest-dom/extend-expect"
import { render as _render, RenderOptions } from "@testing-library/react"
import { ReactElement } from "react"
import { ContextWrapper } from "../components/ContextWrapper"

export const render = (ui: ReactElement, options?: RenderOptions) =>
  _render(ui, { wrapper: ContextWrapper, ...options })
