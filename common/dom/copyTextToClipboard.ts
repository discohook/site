export const copyTextToClipboard = (text: string) => {
  const input = document.createElement("textarea")

  input.value = text

  input.style.position = "fixed"
  input.style.opacity = "0"

  const root =
    document.querySelector('[data-focus-lock-disabled="false"]') ??
    document.body
  root.append(input)

  input.focus()
  input.select()

  document.execCommand("copy")

  input.remove()
}
