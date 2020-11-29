import { getTime } from "date-fns"
import React, { useEffect, useRef, useState } from "react"
import { PopoverContainer } from "../../popover/PopoverContainer"
import { usePopover } from "../../popover/usePopover"
import { InputField } from "../text/InputField"
import { DatePicker } from "./DatePicker"
import { getDateTimeString } from "./getDateTimeString"

const TIMESTAMP_FORMAT_RE = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/

export type TimestampInputProps = {
  id: string
  value: Date
  onChange: (value: Date) => void
  label: string
}

export function TimestampInputField(props: TimestampInputProps) {
  const { id, value, onChange: handleChange, label } = props

  const [input, setInput] = useState(() => getDateTimeString(value) ?? "")

  const lastDateRef = useRef<number>(value.getTime())
  useEffect(() => {
    // Object.is considers NaN to be equal to NaN
    if (!Object.is(lastDateRef.current, getTime(value))) {
      setInput(getDateTimeString(value) ?? "")
    }

    lastDateRef.current = getTime(value)
  }, [value])

  const handleInputChange = (value: string) => {
    setInput(value)

    if (!value) {
      handleChange(new Date(Number.NaN))
      return
    }

    const match = TIMESTAMP_FORMAT_RE.exec(value)
    if (!match) return

    const [, year, month, day, hours, minutes] = match
    handleChange(
      new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hours),
        Number(minutes),
      ),
    )
  }

  const inputRef = useRef<HTMLInputElement>(null)

  const popover = usePopover({
    ref: inputRef,
    render: () => (
      <PopoverContainer>
        <DatePicker date={value} onChange={handleChange} />
      </PopoverContainer>
    ),
    placement: "bottom-start",
    shards: [inputRef],
  })

  return (
    <InputField
      ref={inputRef}
      id={id}
      value={input}
      label={label}
      placeholder="YYYY-MM-DD hh:mm"
      error={
        input && !TIMESTAMP_FORMAT_RE.test(input)
          ? "Invalid date format"
          : undefined
      }
      onChange={handleInputChange}
      onClick={() => {
        popover.spawn()
      }}
    />
  )
}
