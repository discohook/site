import React, { ComponentType } from "react"

export const omitProp = <P extends Record<string, unknown>>(
  Component: ComponentType<P>,
  ...omit: string[]
) => {
  return ({ ...props }: P) => {
    for (const prop of omit) {
      delete props[prop]
    }

    return <Component {...props} />
  }
}
