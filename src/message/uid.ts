let lastId = 0
export const getUniqueId = () => (lastId += 1)

export const id = Symbol.for("id")
