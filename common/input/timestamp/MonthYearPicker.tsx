import { addMonths, getMonth, getYear, isValid, subMonths } from "date-fns"
import { size } from "polished"
import React from "react"
import styled, { css } from "styled-components"
import { chevronLeft } from "./icons/chevronLeft"
import { chevronRight } from "./icons/chevronRight"

const Container = styled.div`
  margin: 8px 0;

  width: 100%;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
`

const CycleMonthButton = styled.div<{ disabled?: boolean }>`
  ${size(24)};

  cursor: pointer;

  color: ${({ theme }) => theme.interactive.normal};

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
      color: ${({ theme }) => theme.interactive.muted};
    `}
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
