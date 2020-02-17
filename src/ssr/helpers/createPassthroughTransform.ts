import { Transform } from "stream"

export const createPassthroughTransform = () =>
  new Transform({
    transform: (chunk, encoding, fn) => {
      fn(null, chunk)
    },
  })
