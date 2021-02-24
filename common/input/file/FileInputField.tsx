import React, { useRef } from "react"
import styled from "styled-components"
import { getHumanReadableSize } from "../../../modules/message/preview/attachment/helpers/getHumanReadableSize"
import { SCREEN_SMALL } from "../../layout/breakpoints"
import { FlexContainer } from "../../layout/FlexContainer"
import { PrimaryButton } from "../button/PrimaryButton"
import { Input } from "../layout/Input"
import { InputConstraint } from "../layout/InputConstraint"
import { InputContainer } from "../layout/InputContainer"
import { InputLabel } from "../layout/InputLabel"
import { PasteFileButton } from "./PasteFileButton"

export const FakeInput = styled(Input)`
  flex: 1;

  input:focus + && {
    border-color: ${({ theme }) => theme.accent.primary};
  }
`

const ClipboardButton = styled(PasteFileButton)`
  ${SCREEN_SMALL} {
    display: none;
  }
`

export type FileInputProps = {
  id: string
  value: readonly File[]
  onChange: (value: File[]) => void
  label: string
  disabled?: boolean
  maxSize?: number
}

export function FileInputField(props: FileInputProps) {
  const {
    id,
    value,
    onChange: handleChange,
    label,
    disabled = false,
    maxSize,
  } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const handleRemoveFiles = () => {
    if (!inputRef.current) return

    inputRef.current.value = ""
    handleChange([])
  }

  return (
    <InputContainer>
      <InputLabel>
        <label htmlFor={id}>{label}</label>
        {maxSize && (
          <InputConstraint>
            {getHumanReadableSize(maxSize)} max.
          </InputConstraint>
        )}
      </InputLabel>
      <FlexContainer>
        <input
          ref={inputRef}
          id={id}
          type="file"
          multiple
          disabled={disabled}
          style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
          onChange={event => {
            handleChange(Array.from(event.target.files ?? []))
          }}
        />
        <FakeInput
          value={value.map(file => file.name).join(", ")}
          readOnly
          disabled={disabled}
          tabIndex={-1}
          style={{ cursor: "default" }}
          onClick={() => {
            inputRef.current?.click()
          }}
        />
        <ClipboardButton onChange={handleChange} disabled={disabled} />
        <PrimaryButton onClick={handleRemoveFiles} disabled={disabled}>
          Clear
        </PrimaryButton>
      </FlexContainer>
    </InputContainer>
  )
}
