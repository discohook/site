import { computed, observable } from "mobx"
import { getFieldWidth } from "../helpers/getFieldWidth"
import { getUniqueId } from "../helpers/getUniqueId"
import type { Embed } from "./Embed"

export class Field {
  readonly id = getUniqueId()

  readonly embed: Embed

  @observable name = ""
  @observable value = ""
  @observable inline = false

  constructor(embed: Embed, field?: Field) {
    this.embed = embed

    if (field) {
      this.name = field.name
      this.value = field.value
      this.inline = field.inline
    }
  }

  @computed get width() {
    return getFieldWidth(this)
  }
}
