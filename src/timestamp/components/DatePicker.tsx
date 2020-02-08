import { isValid, startOfMinute, startOfMonth } from "date-fns"
import React, { useState } from "react"
import styled from "styled-components"
import { Actions } from "../../editor/components/Actions"
import { subTimezoneOffset } from "../helpers/subTimezoneOffset"
import { DayPicker } from "./DayPicker"
import { MonthYearPicker } from "./MonthYearPicker"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export type DatePickerProps = {
  date: Date
  onChange: (date: Date | undefined) => void
}

export function DatePicker(props: DatePickerProps) {
  const { date, onChange: handleChange } = props

  const [month, setMonth] = useState(
    startOfMonth(isValid(date) ? date : Date.now()),
  )

  return (
    <Container>
      <Actions
        actions={[
          {
            name: "Today",
            action: () => {
              handleChange(subTimezoneOffset(startOfMinute(Date.now())))
              setMonth(startOfMonth(Date.now()))
            },
          },
          {
            name: "Clear",
            action: () => handleChange(undefined),
          },
        ]}
      />
      <MonthYearPicker date={month} onChange={setMonth} />
      <DayPicker date={date} onChange={handleChange} month={month} />
    </Container>
  )
}
