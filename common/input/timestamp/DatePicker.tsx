import { isValid, startOfMinute, startOfMonth } from "date-fns"
import React, { useState } from "react"
import styled from "styled-components"
import { Clickable } from "../Clickable"
import { DayPicker } from "./DayPicker"
import { MonthYearPicker } from "./MonthYearPicker"

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 260px;
`

const Actions = styled.div`
  display: flex;
  justify-content: end;

  margin-bottom: 12px;
`

const Action = styled(Clickable)`
  font-weight: 500;
  color: ${({ theme }) => theme.interactive.active};

  cursor: pointer;

  & + & {
    margin-left: 16px;
  }

  &:focus {
    text-decoration: underline;
  }
`

export type DatePickerProps = {
  date: Date
  onChange: (date: Date) => void
}

export function DatePicker(props: DatePickerProps) {
  const { date, onChange: handleChange } = props

  const [month, setMonth] = useState(
    startOfMonth(isValid(date) ? date : Date.now()),
  )

  return (
    <Container>
      <Actions>
        <Action
          onClick={() => {
            handleChange(startOfMinute(Date.now()))
            setMonth(startOfMonth(Date.now()))
          }}
        >
          Today
        </Action>
        <Action onClick={() => handleChange(new Date(Number.NaN))}>
          Clear
        </Action>
      </Actions>
      <MonthYearPicker date={month} onChange={setMonth} />
      <DayPicker date={date} onChange={handleChange} month={month} />
    </Container>
  )
}
