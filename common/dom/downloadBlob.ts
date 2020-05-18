export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob)

  const anchor = document.createElement("a")
  document.body.append(anchor)

  anchor.href = url
  anchor.download = name

  anchor.click()

  anchor.remove()
  URL.revokeObjectURL(url)
}
