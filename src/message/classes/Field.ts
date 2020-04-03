import { computed, observable } from "mobx"
import { getFieldWidth } from "../helpers/getFieldWidth"
import { getUniqueId } from "../helpers/getUniqueId"
import type { FieldData } from "../types/FieldData"
import type { Embed } from "./Embed"

export class Field {
  readonly id = getUniqueId()

  readonly embed: Embed

  @observable name: string
  @observable value: string
  @observable inline: boolean

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
