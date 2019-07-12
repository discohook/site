import { css, Global } from "@emotion/core"
import { withTheme } from "emotion-theming"
import React from "react"
import { Theme } from "./themes"

function GlobalStyle(props: { theme: Theme }) {
  const { theme } = props

  return (
    <Global
      styles={css`
        @font-face {
          font-family: Whitney;
          font-style: normal;
          font-weight: 300;
          font-display: swap;
          src: url("/whitney-300.woff2") format("woff2"),
            url("/whitney-300.woff") format("woff");
        }

        @font-face {
          font-family: Whitney;
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url("/whitney-400.woff2") format("woff2"),
            url("/whitney-400.woff") format("woff");
        }

        @font-face {
          font-family: Whitney;
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: url("/whitney-500.woff2") format("woff2"),
            url("/whitney-500.woff") format("woff");
        }

        @font-face {
          font-family: Whitney;
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: url("/whitney-600.woff2") format("woff2"),
            url("/whitney-600.woff") format("woff");
        }

        @font-face {
          font-family: Whitney;
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url("/whitney-700.woff2") format("woff2"),
            url("/whitney-700.woff") format("woff");
        }

        body {
          margin: 0;
          font-family: ${theme.fonts.normal};
          line-height: 1;

          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;

          background: ${theme.background};
          color: ${theme.text};
        }

        code {
          font-family: ${theme.fonts.code};
        }

        a {
          color: ${theme.link};

          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }

        img[alt] {
          text-indent: 100%;
          white-space: nowrap;
          overflow: hidden;
        }

        ::-webkit-scrollbar {
          width: 14px;
          height: 14px;
          background-color: ${theme.background};
        }

        ::-webkit-scroll-corner {
          background-color: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background-color: ${theme.scrollBar.thumb};
          border: 3px solid ${theme.background};
          border-radius: 7px;
          background-clip: padding-box;
        }

        ::-webkit-scrollbar-track-piece {
          background-color: ${theme.scrollBar.track};
          border: 3px solid ${theme.background};
          border-radius: 7px;
        }

        ::-webkit-resizer {
          background-color: ${theme.background};
        }
      `}
    />
  )
}

export default withTheme(GlobalStyle)
