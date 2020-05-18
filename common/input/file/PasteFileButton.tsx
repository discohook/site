import React, { ClipboardEvent, useRef } from "react"
import { Button } from "../Button"

export type PasteFileButtonProps = {
  onChange: (files: File[]) => void
}

export function PasteFileButton(props: PasteFileButtonProps) {
  const { onChange: handleChange } = props

  const pasteButtonRef = useRef<HTMLButtonElement>(null)
  const pasteInputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    const { current: pasteButton } = pasteButtonRef
    if (!pasteButton) return

    pasteButton.textContent = /mac/i.test(navigator.platform)
      ? "Press \u2318V"
      : "Press Ctrl+V"
  }

  const handleBlur = () => {
    const { current: pasteButton } = pasteButtonRef
    if (!pasteButton) return

    pasteButton.textContent = "Paste clipboard"
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    handleChange(Array.from(event.clipboardData.files))

    pasteInputRef.current?.blur()
  }

  return (
    <>
      <input
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPaste={handlePaste}
        ref={pasteInputRef}
      />
      <Button
        onClick={() => {
          pasteInputRef.current?.focus()
        }}
        ref={pasteButtonRef}
      >
        Paste clipboard
      </Button>
    </>
  )
}
