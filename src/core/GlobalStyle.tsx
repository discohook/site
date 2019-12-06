import { css, Global } from "@emotion/core"
import { useTheme } from "emotion-theming"
import React from "react"
import { Theme } from "./themes"

const getFontFace = (name: string, weight: number, url: string) => css`
  @font-face {
    font-family: ${name};
    font-style: normal;
    font-weight: ${weight};
    font-display: swap;
    src: ${["woff", "woff2"]
      .map(format => `url("${url}-${weight}.${format}") format("${format}")`)
      .join(",")};
  }
`

const fonts = [
  {
    name: "Whitney",
    weights: [300, 400, 500, 600, 700],
    url: "/fonts/whitney",
  },
  {
    name: "SourceCodePro",
    weights: [500, 600],
    url: "/fonts/source-code-pro",
  },
].flatMap(font => {
  const { weights, ...rest } = font
  return weights.map(weight => ({ ...rest, weight }))
})

const styles = (theme: Theme) => css`
  ${fonts.map(font => getFontFace(font.name, font.weight, font.url))};

  html,
  body {
    margin: 0;
    padding: 0;

    background: ${theme.background.primary};

    line-height: 1;
    color: ${theme.text.normal};
    font-size: ${theme.appearance.fontSize}px;

    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    height: 100%;
    overflow: hidden;
  }

  html,
  body,
  button,
  input,
  textarea {
    font-family: ${theme.font.sans};
  }

  #app {
    height: 100%;
  }

  pre,
  code {
    font-family: ${theme.font.mono};
  }

  a {
    color: ${theme.text.link};

    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
  }

  * {
    box-sizing: border-box;

    scrollbar-color: ${theme.appearance.color === "dark"
      ? "#202225 #2f3136"
      : "#e3e5e8 #f6f6f7"};
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      width: 14px;
      height: 14px;
      background-color: ${theme.background.primary};
    }

    &::-webkit-scroll-corner {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${theme.appearance.color === "dark"
        ? "#202225"
        : "#e3e5e8"};
      border: 3px solid ${theme.background.primary};
      border-radius: 7px;
      background-clip: padding-box;
    }

    &::-webkit-scrollbar-track-piece {
      background-color: ${theme.appearance.color === "dark"
        ? "#2f3136"
        : "#f6f6f7"};
      border: 3px solid ${theme.background.primary};
      border-radius: 7px;
    }

    &::-webkit-resizer {
      background-color: ${theme.background.primary};
    }
  }
`

export default function GlobalStyle() {
  const theme = useTheme<Theme>()

  return <Global styles={styles(theme)} />
}
