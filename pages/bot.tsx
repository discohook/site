import React, { useEffect } from "react"
import styled from "styled-components"
import { PageHead } from "../common/PageHead"

const Container = styled.div`
  margin: 64px 16px;
  text-align: center;
`

const Header = styled.h1`
  color: ${({ theme }) => theme.header.primary};
`

const BOT_INVITE =
  "https://discord.com/api/oauth2/authorize?client_id=633565743103082527&permissions=537250880&scope=bot"

export default function Discord() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace(BOT_INVITE)
    }
  })

  return (
    <Container>
      <PageHead title="Discobot invite link" description="" />
      <Header>You are being redirected</Header>
      <p>
        If nothing is happenning, please navigate to{" "}
        <a href={BOT_INVITE}>{BOT_INVITE}</a>.
      </p>
    </Container>
  )
}
