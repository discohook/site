import { Field } from "./Field"

export type FieldWithoutIds = Omit<Field, symbol>
