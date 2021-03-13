import React, { forwardRef, useEffect, useRef } from "react"
import mergeRefs from "react-merge-refs"
import type { ReactRef } from "../../state/ReactRef"
import { InputField, InputFieldProps } from "./InputField"

export type HiddenInputFieldProps = Omit<InputFieldProps, "rows">

function HiddenInputFieldRenderer(
  props: HiddenInputFieldProps,
  ref: ReactRef<HTMLInputElement>,
) {
  const { type = "text", ...inputProps } = props

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const { current: input } = inputRef
    if (!input) return

    const onFocus = () => {
      input.type = type
    }
    const onBlur = () => {
      input.type = "password"
    }

    input.addEventListener("focus", onFocus)
    input.addEventListener("blur", onBlur)

    return () => {
      input.removeEventListener("focus", onFocus)
      input.removeEventListener("blur", onBlur)
    }
  }, [type])

  return (
    <InputField
      ref={mergeRefs([inputRef, ref])}
      type="password"
      {...inputProps}
    />
  )
}

export const HiddenInputField = forwardRef(HiddenInputFieldRenderer)
