import { computed, observable } from "mobx"
import { getUniqueId } from "../../common/uid"
import type { Embed } from "./Embed"
import { getFieldWidth } from "./helpers/getFieldWidth"

export class Field {
  readonly id: number

  readonly embed: Embed

  @observable name = ""
  @observable value = ""
  @observable inline = false

  constructor(embed: Embed, field?: Field, id = getUniqueId()) {
    this.id = id
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
