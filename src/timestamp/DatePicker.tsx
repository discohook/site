import { isValid, startOfMinute, startOfMonth } from "date-fns"
import React, { useState } from "react"
import styled from "styled-components"
import Actions from "../editor/Actions"
import DayPicker from "./DayPicker"
import MonthYearPicker from "./MonthYearPicker"
import { subTimezoneOffset } from "./timezoneOffset"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

type Props = {
  date: Date
  onChange: (date: Date | undefined) => void
}

export default function DatePicker(props: Props) {
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
