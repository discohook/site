import { action, observable } from "mobx"
import { Modal, ModalOptions } from "./Modal"

export class ModalManager {
  @observable modals: Modal[] = []

  @action spawn(options: ModalOptions) {
    this.modals.push(new Modal(this, options))
  }

  @action dismiss(modal: Modal) {
    const index = this.modals.indexOf(modal)
    if (index >= 0) this.modals.splice(index, 1)
  }
}
