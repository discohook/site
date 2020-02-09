import { ID } from "../constants/id"

export type Field = {
  readonly [ID]: number
  readonly name?: string
  readonly value?: string
  readonly inline?: boolean
}
