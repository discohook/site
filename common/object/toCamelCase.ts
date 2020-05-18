import { mapKeys } from "./mapKeys"

export const toCamelCase = (object: object) =>
  mapKeys(object, key =>
    key.replace(/_[a-z]/g, match => match.slice(1).toUpperCase()),
  )
