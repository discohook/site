import moment from "moment"
import React from "react"
import styled from "styled-components"
import { Footer } from "./Message"

interface Props {
  footer?: Footer
  timestamp?: string
}

const Container = styled.div`
  display: flex;
  align-items: center;

  * + & {
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
  color: ${(props) => props.theme.embed.footer.text};
  font-size: 12px;
  font-weight: 500;
`

const FooterSeparator = styled.span`
  display: inline-block;
  margin: 0 4px;

  color: ${(props) => props.theme.embed.footer.separator};
  font-weight: 700;
`

export function EmbedFooter(props: Props) {
  return (
    <Container>
      {props.footer && props.footer.iconUrl && (
        <FooterImage src={props.footer.iconUrl} />
      )}
      <FooterText>
        {props.footer && props.footer.text}
        {props.footer && props.timestamp && (
          <FooterSeparator>•</FooterSeparator>
        )}
        {props.timestamp && moment(props.timestamp).calendar()}
      </FooterText>
    </Container>
  )
}
