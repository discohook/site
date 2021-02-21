import { isValid } from "date-fns"
import { rem } from "polished"
import React, { useCallback, useEffect, useState } from "react"
import styled, { css, useTheme } from "styled-components"
import { formatTimestamp } from "./formatTimestamp"

const Display = styled.span`
  display: inline-block;
  height: ${rem(20)};

  color: ${({ theme }) => theme.text.muted};

  ${({ theme }) =>
    theme.appearance.display === "cozy" &&
    css`
      margin-left: ${rem(4)};

      font-size: ${rem(12)};
      font-weight: 500;
      line-height: ${rem(22)};
      vertical-align: baseline;
    `};

  ${({ theme }) =>
    theme.appearance.display === "compact" &&
    css`
      width: ${rem(48)};
      margin-right: ${rem(8)};

      font-size: ${rem(11)};
      line-height: ${rem(22)};
      text-align: right;
      text-indent: 0;
    `};
`

export type ClockProps = {
  timestamp?: Date
}

export function Clock(props: ClockProps) {
  let { timestamp } = props
  if (timestamp && !isValid(timestamp)) timestamp = undefined

  const theme = useTheme()

  const format = useCallback(
    (timestamp: Date = new Date()) => {
      if (theme.appearance.display === "compact") {
        return timestamp.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      }

      return formatTimestamp(timestamp)
    },
    [theme.appearance.display],
  )

  const [displayedTime, setDisplayedTime] = useState(() => format(timestamp))

  useEffect(() => {
    if (!timestamp) {
      const interval = setInterval(() => setDisplayedTime(format()), 1000)
      return () => clearInterval(interval)
    }

    setDisplayedTime(format(timestamp))
  }, [format, timestamp])

  return <Display>{displayedTime}</Display>
}
