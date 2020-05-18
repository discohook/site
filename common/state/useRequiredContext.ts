import { Context, useContext } from "react"

export const useRequiredContext = <T>(context: Context<T>) => {
  const value = useContext(context)

  if (value == null) {
    const displayName = context.displayName ?? "Context"
    throw new Error(`${displayName} is not available in the component tree.`)
  }

  return value as Exclude<T, undefined | null>
}
