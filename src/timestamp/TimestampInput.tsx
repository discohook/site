import { isValid } from "date-fns"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Container } from "../editor/styles"
import InputField from "../form/InputField"
import DatePicker from "./DatePicker"
import { addTimezoneOffset, subTimezoneOffset } from "./timezoneOffset"

const TimestampInputContainer = styled(Container)`
  position: relative;
  flex-flow: row-reverse;
`

const PopoverContainer = styled.div`
  position: absolute;
  top: 76px;
  z-index: 1;

  width: 100%;
  min-width: 280px;
  max-width: 320px;

  padding: 12px;

  background: ${({ theme }) => theme.background.floating};
  border-radius: 4px;
`

type Props = {
  id: string
  timestamp?: string
  onChange: (timestamp?: string) => void
}

const formatTimestamp = (iso: string | undefined) =>
  iso &&
  subTimezoneOffset(new Date(iso))
    .toISOString()
    .replace("T", " ")
    .slice(0, -8)

export default function TimestampInput(props: Props) {
  const { id, timestamp, onChange } = props

  const date = subTimezoneOffset(new Date(timestamp ?? NaN))

  const [isPickerShown, setPickerShown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const [formatted, setFormatted] = useState(formatTimestamp(timestamp))
  useEffect(() => {
    const isTimestamp = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(timestamp ?? "")
    const next = formatTimestamp(timestamp)

    if (!isTimestamp) return
    if (!formatted && !next) return

    setFormatted(next)
  }, [formatted, timestamp])

  const handleChange = (value: string) => {
    setFormatted(value)

    if (!value) {
      onChange(undefined)
      return
    }

    if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value)) return

    const date = new Date(`${value.replace(" ", "T")}:00.000Z`)
    const offsetAdjusted = addTimezoneOffset(date)

    onChange(offsetAdjusted.toISOString())
  }

  const handleDateChange = (date: Date | undefined) => {
    if (!date || !isValid(date)) {
      handleChange("")
      return
    }

    handleChange(
      date
        .toISOString()
        .replace("T", " ")
        .slice(0, -8),
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
        value={formatted}
        onChange={handleChange}
        label="Timestamp"
        placeholder="YYYY-MM-DD hh:mm"
      />
      {isPickerShown && (
        <PopoverContainer onMouseDown={event => event.preventDefault()}>
          <DatePicker date={date} onChange={handleDateChange} />
        </PopoverContainer>
      )}
    </TimestampInputContainer>
  )
}
