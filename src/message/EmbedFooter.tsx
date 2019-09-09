import styled from "@emotion/styled"
import React from "react"
import { Theme } from "../themes"
import { formatTimestamp } from "./formatTimestamp"
import { Footer } from "./Message"

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

  object-fit: cover;
  border-radius: 50%;
`

const FooterText = styled.span<{}, Theme>`
  color: ${({ theme }) =>
    theme.color === "dark"
      ? "rgba(255, 255, 255, 0.6)"
      : "rgba(79, 83, 91, 0.6)"};
  font-size: 12px;
  font-weight: 500;
`

const FooterSeparator = styled.span<{}, Theme>`
  display: inline-block;
  margin: 0 4px;

  color: ${({ theme }) => (theme.color === "dark" ? "#4f545c" : "#cacbce")};
  font-weight: 700;
`

type Props = {
  footer?: Footer
  timestamp?: string
}

export default function EmbedFooter(props: Props) {
  const { footer, timestamp } = props
  const { text, iconUrl } = footer || { text: undefined, iconUrl: undefined }

  return (
    <Container>
      {iconUrl !== undefined && (
        <FooterImage src={String(iconUrl)} alt="Footer image" />
      )}
      <FooterText>
        {String(text === undefined ? "" : text)}
        {footer && timestamp && <FooterSeparator>•</FooterSeparator>}
        {timestamp && formatTimestamp(timestamp)}
      </FooterText>
    </Container>
  )
}
