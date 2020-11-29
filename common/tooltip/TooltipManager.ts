import { action, observable } from "mobx"
import { getUniqueId } from "../state/uid"
import type { Tooltip } from "./Tooltip"

export class TooltipManager {
  @observable tooltips: Tooltip[] = []

  @action add(tooltip: Omit<Tooltip, "id">) {
    const id = getUniqueId()

    this.tooltips.push({
      ...tooltip,
      id,
    })

    return () => {
      const index = this.tooltips.findIndex(tooltip => tooltip.id === id)
      if (index >= 0) {
        this.tooltips.splice(index, 1)
      }
    }
  }
}
