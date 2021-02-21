import { rem } from "polished"
import React, { useEffect, useState } from "react"
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
  const { timestamp } = props

  const theme = useTheme()

  const [displayedTime, setDisplayedTime] = useState("")
  useEffect(() => {
    const update = (timestamp: Date = new Date()) => {
      if (theme.appearance.display === "cozy") {
        setDisplayedTime(formatTimestamp(timestamp))
      } else {
        setDisplayedTime(
          timestamp.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        )
      }
    }

    if (!timestamp || Number.isNaN(timestamp.getTime())) {
      const interval = setInterval(update, 1000)
      return () => clearInterval(interval)
    }

    update(timestamp)
  }, [theme.appearance.display, timestamp])

  return <Display>{displayedTime}</Display>
}
