import { action, observable } from "mobx"
import { InitialisableStore } from "../../state/classes/InitialisableStore"
import { Modal } from "../types/Modal"

export class ModalStore extends InitialisableStore {
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
