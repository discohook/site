import React, { ClipboardEvent, useRef, useState } from "react"
import styled from "styled-components"
import { SecondaryButton } from "../button/SecondaryButton"

const Button = styled(SecondaryButton)`
  input:focus + && {
    background: ${({ theme }) => theme.background.tertiary};
    border-color: ${({ theme }) => theme.background.tertiary};
  }
`

export type PasteFileButtonProps = {
  className?: string
  onChange: (files: File[]) => void
  disabled?: boolean
}

export function PasteFileButton(props: PasteFileButtonProps) {
  const { className, onChange: handleChange, disabled = false } = props

  const [active, setActive] = useState(false)

  const pasteInputRef = useRef<HTMLInputElement>(null)

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    handleChange(Array.from(event.clipboardData.files))
    pasteInputRef.current?.blur()
  }

  return (
    <>
      <input
        ref={pasteInputRef}
        tabIndex={-1}
        placeholder="Paste your clipboard"
        disabled={disabled}
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
        }}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onPaste={handlePaste}
      />
      <Button
        className={className}
        disabled={disabled}
        onClick={() => {
          pasteInputRef.current?.focus()
        }}
      >
        {active
          ? /mac/i.test(navigator.platform)
            ? "Press \u2318V"
            : "Press Ctrl+V"
          : "Clipboard"}
      </Button>
    </>
  )
}
