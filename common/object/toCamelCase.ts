import { mapKeys } from "./mapKeys"

export const toCamelCase = (object: unknown) =>
  mapKeys(object, key =>
    key.replace(/_[a-z]/g, match => match.slice(1).toUpperCase()),
  )
