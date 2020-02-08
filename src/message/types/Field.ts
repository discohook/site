import { id } from "../helpers/getUniqueId"

export type Field = {
  readonly [id]: number
  readonly name?: string
  readonly value?: string
  readonly inline?: boolean
}
