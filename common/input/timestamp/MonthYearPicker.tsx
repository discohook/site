import { addMonths, getMonth, getYear, isValid, subMonths } from "date-fns"
import React from "react"
import styled, { css } from "styled-components"
import { chevronLeft, chevronRight } from "../../../icons/chevron"
import { Icon } from "../../layout/Icon"

const Container = styled.div`
  width: 100%;
  margin-bottom: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
`

const CycleMonthButton = styled(Icon)<{ disabled?: boolean }>`
  ${({ disabled }) =>
    disabled &&
    css`
      color: ${({ theme }) => theme.interactive.muted};
    `};
`

const MonthYearDisplay = styled.div`
  margin: auto;

  font-size: 16px;
  text-align: center;
`

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export type MonthYearPickerProps = {
  date: Date
  onChange: (date: Date) => void
}

export function MonthYearPicker(props: MonthYearPickerProps) {
  const { date, onChange: handleChange } = props

  return (
    <Container>
      <CycleMonthButton
        disabled={!isValid(date)}
        onClick={() => {
          if (isValid(date)) handleChange(subMonths(date, 1))
        }}
      >
        {chevronLeft}
      </CycleMonthButton>
      <MonthYearDisplay>
        {isValid(date)
          ? `${months[getMonth(date)]} ${getYear(date)}`
          : "Unknown"}
      </MonthYearDisplay>
      <CycleMonthButton
        disabled={!isValid(date)}
        onClick={() => {
          if (isValid(date)) handleChange(addMonths(date, 1))
        }}
      >
        {chevronRight}
      </CycleMonthButton>
    </Container>
  )
}
