import Head from "next/head"
import Link from "next/link"
import Router from "next/router"
import React, { ErrorInfo } from "react"
import styled from "styled-components"
import { CodeBlockContainer } from "../modules/markdown/styles/CodeBlockContainer"
import { SCREEN_SMALL } from "./breakpoints"
import { Button } from "./input/Button"

const Container = styled.div`
  height: 100%;

  overflow: auto;

  padding: 64px 32px 0;

  ${SCREEN_SMALL} {
    padding: 32px 16px;
  }
`

const Header = styled.h1`
  margin: 0;

  color: ${({ theme }) => theme.header.primary};
  font-size: 28px;
`

const Message = styled.p`
  margin: 16px 0;

  max-width: 600px;

  font-size: 16px;
  line-height: 1.375;
`

const ButtonContainer = styled.div`
  margin: 0 -8px;
`

const ErrorDetails = styled(CodeBlockContainer)`
  max-width: 1200px;
  margin-bottom: 32px;
`

const STATUS_CODES: Map<number, string> = new Map([
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Page not found"],
  [405, "Method not allowed"],
  [500, "Internal server error"],
])

export type ErrorPageProps = {
  error?: Error
  info?: ErrorInfo
  title?: string
  statusCode?: number
}

export function ErrorPage(props: ErrorPageProps) {
  const { error, info, title, statusCode } = props

  const message =
    title ??
    (statusCode && STATUS_CODES.has(statusCode)
      ? `Error ${statusCode}: ${STATUS_CODES.get(statusCode)}`
      : "An unexpected error has occurred")

  return (
    <Container>
      <Head>
        <title key="title">{message}</title>
      </Head>
      <Header>{message}</Header>
      <Message>
        If you didn&apos;t expect this, please report it on the{" "}
        <a href="/discord" target="blank" rel="noopener">
          Discord support server
        </a>
        , or create an issue on the{" "}
        <a
          href="https://github.com/discohook/discohook"
          target="blank"
          rel="noopener"
        >
          GitHub repository
        </a>
        .
      </Message>
      <ButtonContainer>
        {statusCode && (
          <Link href="/">
            <Button>Home</Button>
          </Link>
        )}
        {!statusCode && (
          <Button onClick={() => Router.reload()}>Refresh</Button>
        )}
      </ButtonContainer>
      {error && info && (
        <>
          <Message>
            Technical details are provided below (please forward this):
          </Message>
          <ErrorDetails>
            {String(error)}
            {"\n"}
            {error.stack?.replace(String(error), "").replace(/^\n|\n$/g, "")}
            {info.componentStack}
          </ErrorDetails>
        </>
      )}
    </Container>
  )
}
