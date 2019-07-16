let nextId = 1
export const getUniqueId = () => nextId++

export const id = Symbol.for("id")
