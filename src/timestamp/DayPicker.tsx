import {
  addDays,
  getDate,
  getHours,
  getMilliseconds,
  getMinutes,
  getMonth,
  getSeconds,
  isMonday,
  isSameDay,
  isSameMonth,
  isValid,
  set,
  startOfISOWeek,
  startOfMonth,
  subWeeks,
} from "date-fns"
import React from "react"
import styled, { css } from "styled-components"

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  margin-top: 4px;
`

const WeekdayCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 2px;

  cursor: default;

  font-size: 12px;
  text-transform: uppercase;
`

const DayCell = styled.div<{ muted?: boolean; selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 24px;
  margin: 2px;

  background: ${({ theme }) => theme.background.tertiary};
  border-radius: 4px;

  cursor: default;

  font-size: 16px;

  ${({ muted }) =>
    muted &&
    css`
      color: ${({ theme }) => theme.interactive.muted};
    `}

  ${({ selected }) =>
    selected &&
    css`
      background: ${({ theme }) => theme.background.secondary};
    `}
`

type Props = {
  date: Date
  onChange: (date: Date) => void
  month?: Date
}

export default function DayPicker(props: Props) {
  const { date, onChange: handleChange, month: monthDate } = props

  const month = startOfMonth(isValid(monthDate) ? monthDate ?? 0 : Date.now())
  const firstDay = isMonday(month) ? subWeeks(month, 1) : startOfISOWeek(month)

  const days = new Array(7 * 6).fill(undefined).map((_, days) =>
    set(addDays(firstDay, days), {
      hours: getHours(date) || 0,
      minutes: getMinutes(date) || 0,
      seconds: getSeconds(date) || 0,
      milliseconds: getMilliseconds(date) || 0,
    }),
  )

  return (
    <CalendarGrid>
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(weekday => (
        <WeekdayCell key={weekday}>{weekday}</WeekdayCell>
      ))}
      {days.map(day => (
        <DayCell
          muted={!isSameMonth(month, day)}
          selected={isSameDay(date, day)}
          onClick={() => handleChange(day)}
          key={`${getMonth(day)}-${getDate(day)}`}
        >
          {getDate(day)}
        </DayCell>
      ))}
    </CalendarGrid>
  )
}
