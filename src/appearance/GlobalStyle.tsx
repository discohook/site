import { createGlobalStyle, css } from "styled-components"

const getFontFace = ({
  name,
  weight,
  url,
}: {
  name: string
  weight: number
  url: string
}) => css`
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
].flatMap(({ weights, ...font }) =>
  weights.map(weight => ({ ...font, weight })),
)

const GlobalStyle = createGlobalStyle`
  ${fonts.map(getFontFace)};

  html,
  body {
    margin: 0;
    padding: 0;

    background: ${({ theme }) => theme.background.primary};

    line-height: 1;
    color: ${({ theme }) => theme.text.normal};
    font-family: ${({ theme }) => theme.font.sans};
    font-size: ${({ theme }) => theme.appearance.fontSize}px;

    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    height: 100%;
    overflow: hidden;
  }

  button,
  input,
  textarea {
    font-family: inherit;
  }

  #app {
    height: 100%;
  }

  pre,
  code {
    font-family: ${({ theme }) => theme.font.mono};
  }

  a {
    color: ${({ theme }) => theme.text.link};

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

    scrollbar-color: ${({ theme }) =>
      theme.appearance.color === "dark"
        ? "#202225 #2f3136"
        : "#e3e5e8 #f6f6f7"};
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      width: 14px;
      height: 14px;
      background-color: ${({ theme }) => theme.background.primary};
    }

    &::-webkit-scroll-corner {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) =>
        theme.appearance.color === "dark" ? "#202225" : "#e3e5e8"};
      border: 3px solid ${({ theme }) => theme.background.primary};
      border-radius: 7px;
      background-clip: padding-box;
    }

    &::-webkit-scrollbar-track-piece {
      background-color: ${({ theme }) =>
        theme.appearance.color === "dark" ? "#2f3136" : "#f6f6f7"};
      border: 3px solid ${({ theme }) => theme.background.primary};
      border-radius: 7px;
    }

    &::-webkit-resizer {
      background-color: ${({ theme }) => theme.background.primary};
    }
  }
`

export default GlobalStyle
