import { css, Global } from "@emotion/core"
import { withTheme } from "emotion-theming"
import React from "react"
import { Theme } from "./themes"

type Font = {
  name: string
  weight: number
  url: string
}

const getFontFace = ({ name, weight, url }: Font) => css`
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

const fonts: Font[] = [
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
  ${fonts.map(getFontFace)};

  html,
  body {
    margin: 0;
    padding: 0;

    font-family: ${theme.fonts.sans};
    line-height: 1;

    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background: ${theme.background.primary};
    color: ${theme.text.normal};

    height: 100%;
  }

  #app {
    height: 100%;
  }

  pre,
  code {
    font-family: ${theme.fonts.mono};
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
    scrollbar-color: ${theme.color === "dark"
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
      background-color: ${theme.color === "dark" ? "#202225" : "#e3e5e8"};
      border: 3px solid ${theme.background.primary};
      border-radius: 7px;
      background-clip: padding-box;
    }

    &::-webkit-scrollbar-track-piece {
      background-color: ${theme.color === "dark" ? "#2f3136" : "#f6f6f7"};
      border: 3px solid ${theme.background.primary};
      border-radius: 7px;
    }

    &::-webkit-resizer {
      background-color: ${theme.background.primary};
    }
  }
`

function GlobalStyle(props: { theme: Theme }) {
  const { theme } = props

  return <Global styles={styles(theme)} />
}

export default withTheme(GlobalStyle)
