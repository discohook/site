import { action } from "mobx"
import type { ReactNode } from "react"
import { getUniqueId } from "../uid"
import type { ModalManager } from "./ModalManager"

export type ModalOptions = {
  render: () => ReactNode
}

export class Modal {
  readonly id = getUniqueId()

  private readonly manager: ModalManager
  readonly render: () => ReactNode

  constructor(manager: ModalManager, options: ModalOptions) {
    this.manager = manager
    this.render = options.render
  }

  @action dismiss() {
    this.manager.dismiss(this)
  }
}
