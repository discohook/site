export const id = Symbol.for("id")

let lastId = 0

export const getUniqueId = () => {
  return (lastId += 1)
}

export const resetLastId = () => {
  lastId = 0
}
