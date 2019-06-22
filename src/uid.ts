let nextId = 1
export const getUniqueId = () => `uid-${nextId++}`

export const id = Symbol.for("id")
