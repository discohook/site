import styled from "@emotion/styled"
import React from "react"
import { Footer } from "./Message"

interface Props {
  footer?: Footer
  timestamp?: string
}

const Container = styled.div`
  display: flex;
  align-items: center;

  * + && {
    margin: 8px 0 0;
  }
`

const FooterImage = styled.img`
  width: 20px;
  height: 20px;

  margin: 0 8px 0 0;

  object-fit: contain;
  border-radius: 50%;
`

const FooterText = styled.span`
  color: ${({ theme }) => theme.message.embed.footer.text};
  font-size: 12px;
  font-weight: 500;
`

const FooterSeparator = styled.span`
  display: inline-block;
  margin: 0 4px;

  color: ${({ theme }) => theme.message.embed.footer.separator};
  font-weight: 700;
`

const getFormat = (date: Date) => {
  const now = new Date()

  const difference = (now.getTime() - date.getTime()) / 86400000

  if (difference < -6) return "full"
  if (difference < -1) return "last-week"
  if (difference < 0) return "yesterday"
  if (difference < 1) return "today"
  if (difference < 2) return "tomorrow"
  if (difference < 7) return "next-week"

  return "full"
}

const formatTimestamp = (timestamp: string) => {
  const iso8601 = /^(\d{4})-(\d{2})-(\d{2})T\d{2}:\d{2}:\d{2}\.\d{3}?Z$/
  const match = iso8601.exec(timestamp)
  if (!match) return "Invalid date"

  const date = new Date(timestamp)
  const [, year, month, day] = match
  const weekday = date.toLocaleString("en-US", { weekday: "long" })
  const time = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "numeric",
    hour12: false,
  })

  switch (getFormat(date)) {
    case "last-week":
      return `Last ${weekday} at ${time}`
    case "yesterday":
      return `Yesterday at ${time}`
    case "today":
      return `Today at ${time}`
    case "tomorrow":
      return `Tomorrow at ${time}`
    case "next-week":
      return `${weekday} at ${time}`
    default:
      return `${day}/${month}/${year}`
  }
}

export default function EmbedFooter(props: Props) {
  const { footer, timestamp } = props
  const { text, iconUrl } = footer || { text: undefined, iconUrl: undefined }

  return (
    <Container>
      {iconUrl && <FooterImage src={iconUrl} alt="" />}
      <FooterText>
        {text}
        {footer && timestamp && <FooterSeparator>•</FooterSeparator>}
        {timestamp && formatTimestamp(timestamp)}
      </FooterText>
    </Container>
  )
}
