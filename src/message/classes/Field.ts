import { computed, observable } from "mobx"
import { getFieldWidth } from "../helpers/getFieldWidth"
import { getUniqueId } from "../helpers/getUniqueId"
import { FieldData } from "../types/FieldData"

type Embed = import("./Embed").Embed

export class Field {
  readonly id = getUniqueId()

  readonly embed: Embed

  @observable name = ""
  @observable value = ""
  @observable inline = false

  constructor(embed: Embed, field: FieldData = {}) {
    this.embed = embed

    this.name = field.name ?? ""
    this.value = field.value ?? ""
    this.inline = field.inline ?? false
  }

  @computed get width() {
    return getFieldWidth(this)
  }
}
