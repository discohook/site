export const timeout = (fn: () => unknown, ms: number) => {
  const id = setTimeout(fn, ms)
  return () => clearTimeout(id)
}
