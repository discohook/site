import { getTime } from "date-fns"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { FlexContainer } from "../../editor/components/Container"
import { InputField } from "../../form/components/InputField"
import { usePopover } from "../../popover/hooks/usePopover"
import { TIMESTAMP_FORMAT_RE } from "../constants"
import { getDateTimeString } from "../helpers/getDateTimeString"
import { DatePicker } from "./DatePicker"

const TimestampInputContainer = styled(FlexContainer)`
  position: relative;
  flex-flow: row-reverse;
`

export type TimestampInputProps = {
  id: string
  timestamp: Date
  onChange: (timestamp: Date) => void
}

export function TimestampInput(props: TimestampInputProps) {
  const { id, timestamp, onChange: handleChange } = props

  const [input, setInput] = useState(() => getDateTimeString(timestamp) ?? "")

  const lastDateRef = useRef<number>(timestamp.getTime())
  useEffect(() => {
    // Object.is considers NaN to be equal to NaN
    if (!Object.is(lastDateRef.current, getTime(timestamp))) {
      setInput(getDateTimeString(timestamp) ?? "")
    }

    lastDateRef.current = getTime(timestamp)
  }, [timestamp])

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

  const containerRef = useRef<HTMLDivElement>(null)

  const popover = usePopover({
    render: () => <DatePicker date={timestamp} onChange={handleChange} />,
    placement: "bottom-end",
    ref: containerRef,
  })

  return (
    <TimestampInputContainer
      flow="row"
      onClick={() => {
        popover.spawn()
      }}
      ref={containerRef}
    >
      <InputField
        id={id}
        value={input}
        onChange={handleInputChange}
        label="Timestamp"
        placeholder="YYYY-MM-DD hh:mm"
      />
    </TimestampInputContainer>
  )
}
