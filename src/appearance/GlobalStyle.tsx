import { fontFace } from "polished"
import { createGlobalStyle } from "styled-components"

const fonts = [
  {
    fontFamily: "Whitney",
    fontFilePath: "/fonts/whitney",
    fontWeights: [300, 400, 500, 600, 700],
  },
  {
    fontFamily: "SourceCodePro",
    fontFilePath: "/fonts/source-code-pro",
    fontWeights: [500, 600],
  },
].flatMap(({ fontWeights, fontFilePath, ...font }) =>
  fontWeights.map(fontWeight => ({
    ...font,
    fontStyle: "normal",
    fontWeight: String(fontWeight),
    fontFilePath: `${fontFilePath}-${fontWeight}`,
    fileFormats: ["woff2", "woff"],
    fontDisplay: "swap",
  })),
)

const GlobalStyle = createGlobalStyle`
  ${fonts.map(fontFace)};

  html,
  body {
    padding: 0;
    margin: 0;
    background: ${({ theme }) => theme.background.primary};

    line-height: 1;
    color: ${({ theme }) => theme.text.normal};
    font-family: ${({ theme }) => theme.font.sans};
    font-size: ${({ theme }) => theme.appearance.fontSize}px;

    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;

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
      [theme.background.tertiary, theme.background.secondary].join(" ")};
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
      background-color: ${({ theme }) => theme.background.tertiary};
      border: 3px solid ${({ theme }) => theme.background.primary};
      border-radius: 7px;
      background-clip: padding-box;
    }

    &::-webkit-scrollbar-track-piece {
      background-color: ${({ theme }) => theme.background.secondary};
      border: 3px solid ${({ theme }) => theme.background.primary};
      border-radius: 7px;
    }

    &::-webkit-resizer {
      background-color: ${({ theme }) => theme.background.primary};
    }
  }
`

export default GlobalStyle
