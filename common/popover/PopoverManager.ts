import { action, observable } from "mobx"
import type { Popover } from "./Popover"

export class PopoverManager {
  @observable popovers: Popover[] = []

  @action spawn(popover: Popover) {
    this.popovers.push(popover)
  }

  @action dismiss(name: string) {
    const popover = this.popovers.find(popover => popover.name === name)
    if (!popover) return

    popover.onDismiss?.()

    this.popovers = this.popovers.filter(popover => popover.name !== name)
  }

  @action update(name: string, partial: Partial<Popover>) {
    const popover = this.popovers.find(popover => popover.name === name)
    if (!popover) return

    const index = this.popovers.indexOf(popover)

    this.popovers[index] = { ...popover, ...partial }
  }
}
