import { action, observable } from "mobx"
import { InitializableStore } from "../../state/classes/InitializableStore"
import { Stores } from "../../state/types/Stores"
import { Modal } from "../types/Modal"

export class ModalStore extends InitializableStore<Stores> {
  @observable modals: Modal[] = []

  @action spawn(modal: Modal) {
    this.modals.push(modal)
  }

  @action dismiss(name: string) {
    this.modals = this.modals.filter(modal => modal.name !== name)
  }

  @action dismissLast() {
    this.modals.pop()
  }
}
