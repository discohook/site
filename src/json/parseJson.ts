export const parseJson = (json: string) => {
  try {
    return { value: JSON.parse(json) }
  } catch (error) {
    const message = error.message.replace(/^JSON\.parse: /, "")
    return { error: message }
  }
}
