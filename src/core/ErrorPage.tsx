import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { ThemeProvider } from "emotion-theming"
import React, { ErrorInfo } from "react"
import GlobalStyle from "./GlobalStyle"
import { darkTheme, Theme } from "./themes"

const Container = styled.div<{}, Theme>`
  width: 100%;
  height: 100%;
  overflow: auto;

  padding: 64px 32px 0;

  ${({ theme }) =>
    theme.mobile &&
    css`
      padding: 32px 16px;
    `};
`

const Header = styled.h1<{}, Theme>`
  margin: 0;

  color: ${({ theme }) => theme.header.primary};
  font-size: 28px;
  font-weight: 600;
`

const Paragraph = styled.p<{}, Theme>`
  max-width: 500px;

  font-size: 16px;
  line-height: 1.375;
`

const ErrorDetails = styled.pre<{}, Theme>`
  max-width: 1200px;
  margin-bottom: 32px;
  padding: 7px;

  background: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.background.tertiary};
  border-radius: 5px;

  color: ${({ theme }) => theme.header.secondary};
  font-size: 0.875rem;
  line-height: 1.125rem;

  white-space: pre-wrap;
`

type Props = {
  error: Error
  info: ErrorInfo
}

export default function ErrorPage(props: Props) {
  const { error, info } = props
  console.log(props)

  return (
    <ThemeProvider<Theme>
      theme={{
        ...darkTheme,
        display: "cozy",
        mobile: /mobile/i.test(navigator.userAgent),
      }}
    >
      <GlobalStyle />
      <Container>
        <Header>An error occurred</Header>
        <Paragraph>
          An uncaught error was thrown. I don&apos;t know what happened, but
          it&apos;s likely not your fault.
        </Paragraph>
        <Paragraph>
          Please get in contact as soon as possible. You can create an issue on{" "}
          <a href="https://github.com/jaylineko/discohook/issues/">
            the GitHub repository
          </a>{" "}
          , or talk to me on Discord (@jay.#1111).
        </Paragraph>
        <Paragraph>More details are provided below:</Paragraph>
        <ErrorDetails>
          {error.toString()}
          {"\n"}
          {error.stack?.replace(error.toString(), "").replace(/^\n|\n$/g, "")}
          {info.componentStack}
        </ErrorDetails>
      </Container>
    </ThemeProvider>
  )
}
