import React from "react"
import { formatTimestamp } from "./formatTimestamp"

export type EmbedTimestampProps = {
  timestamp: Date
}

export function EmbedTimestamp(props: EmbedTimestampProps) {
  const { timestamp } = props

  return <span>{formatTimestamp(timestamp)}</span>
}
