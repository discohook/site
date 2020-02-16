import { action, computed, observable } from "mobx"
import { getFieldWidth } from "../helpers/getFieldWidth"
import { getUniqueId } from "../helpers/getUniqueId"
import { FieldData } from "../types/FieldData"

type Embed = import("./Embed").Embed

export class Field {
  readonly id = getUniqueId()

  readonly embed: Embed

  @observable name?: string
  @observable value?: string
  @observable inline = false

  constructor(embed: Embed, field: FieldData = {}) {
    this.embed = embed
    this.apply(field)
  }

  @action apply(field: FieldData) {
    this.name = field.name
    this.value = field.value
    this.inline = field.inline ?? false
  }

  @computed get width() {
    return getFieldWidth(this)
  }

  toJS(): FieldData {
    return {
      name: this.name,
      value: this.value,
      inline: this.inline || undefined,
    }
  }
}
