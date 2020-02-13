import React, { ErrorInfo } from "react"
import styled, { css, ThemeProvider } from "styled-components"
import { GlobalStyle } from "../../appearance/components/GlobalStyle"
import { DARK_THEME } from "../../appearance/constants/darkTheme"
import { CodeBlockContainer } from "../../markdown/components/CodeBlockContainer"
import { Markdown } from "../../markdown/components/Markdown"

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;

  padding: 64px 32px 0;

  ${({ theme }) =>
    theme.appearance.mobile &&
    css`
      padding: 32px 16px;
    `};
`

const Header = styled.h1`
  margin: 0;

  color: ${({ theme }) => theme.header.primary};
  font-size: 28px;
  font-weight: 600;
`

const Message = styled.p`
  margin: 16px 0 24px;

  max-width: 600px;

  font-size: 16px;
  line-height: 1.375;
`

const ErrorDetails = styled(CodeBlockContainer)`
  max-width: 1200px;
  margin-bottom: 32px;
`

export type ErrorPageProps = {
  error: Error
  info: ErrorInfo
}

export function ErrorPage(props: ErrorPageProps) {
  const { error, info } = props
  console.log(props)

  return (
    <ThemeProvider
      theme={{
        ...DARK_THEME,
        appearance: {
          color: "dark",
          display: "cozy",
          fontSize: 16,
          mobile: /mobile/i.test(navigator.userAgent),
        },
      }}
    >
      <GlobalStyle />
      <Container>
        <Header>An error occurred</Header>
        <Message>
          <Markdown
            type="message-content"
            content={[
              "An uncaught error was thrown. I don't know what happened, but it's likely not your fault.",
              [
                "Please get in contact as soon as possible. You can talk to me on Discord (@jay.#1111),",
                "or create an issue on [the GitHub repository](https://github.com/jaylineko/discohook/issues/).",
              ].join(" "),
              "More details are provided below:",
            ].join("\n\n")}
          />
        </Message>
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
