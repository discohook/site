import { getTime } from "date-fns"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Z_INDEX_POPOVERS } from "../../core/constants"
import { FlexContainer } from "../../editor/components/Container"
import { InputField } from "../../form/components/InputField"
import { TIMESTAMP_FORMAT_RE } from "../constants"
import { getDateTimeString } from "../helpers/getDateTimeString"
import { DatePicker } from "./DatePicker"

const TimestampInputContainer = styled(FlexContainer)`
  position: relative;
  flex-flow: row-reverse;
`

const PopoverContainer = styled.div`
  position: absolute;
  top: 76px;
  z-index: ${Z_INDEX_POPOVERS};

  width: 100%;
  min-width: 280px;
  max-width: 320px;

  padding: 12px;

  background: ${({ theme }) => theme.background.floating};
  border-radius: 4px;
`

export type TimestampInputProps = {
  id: string
  timestamp: Date
  onChange: (timestamp: Date) => void
}

export function TimestampInput(props: TimestampInputProps) {
  const { id, timestamp, onChange: handleChange } = props

  const [isPickerShown, setPickerShown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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
      handleChange(new Date(NaN))
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

  return (
    <TimestampInputContainer
      flow="row"
      onFocus={() => setPickerShown(true)}
      onBlur={() => {
        setTimeout(() => {
          if (!containerRef.current?.contains(document.activeElement)) {
            setPickerShown(false)
          }
        }, 10)
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
      {isPickerShown && (
        <PopoverContainer onMouseDown={event => event.preventDefault()}>
          <DatePicker date={timestamp} onChange={handleChange} />
        </PopoverContainer>
      )}
    </TimestampInputContainer>
  )
}
