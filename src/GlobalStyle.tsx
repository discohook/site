import { css, Global } from "@emotion/core"
import { withTheme } from "emotion-theming"
import React from "react"
import { Theme } from "./styled"

function GlobalStyle({ theme }: { theme: Theme }) {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: Whitney;
          font-weight: 300;
          src: url("https://discordapp.com/assets/6c6374bad0b0b6d204d8d6dc4a18d820.woff")
            format("woff");
        }

        @font-face {
          font-family: Whitney;
          font-weight: 400;
          src: url("https://discordapp.com/assets/e8acd7d9bf6207f99350ca9f9e23b168.woff")
            format("woff");
        }

        @font-face {
          font-family: Whitney;
          font-weight: 500;
          src: url("https://discordapp.com/assets/3bdef1251a424500c1b3a78dea9b7e57.woff")
            format("woff");
        }

        @font-face {
          font-family: Whitney;
          font-weight: 600;
          src: url("https://discordapp.com/assets/be0060dafb7a0e31d2a1ca17c0708636.woff")
            format("woff");
        }

        @font-face {
          font-family: Whitney;
          font-weight: 700;
          src: url("https://discordapp.com/assets/8e12fb4f14d9c4592eb8ec9f22337b04.woff")
            format("woff");
        }

        body {
          margin: 0;
          font-family: "Whitney", "Helvetica Neue", "Helvetica", "Arial",
            sans-serif;
          line-height: 1;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;

          background: ${theme.background};
          color: ${theme.text};
        }

        code {
          font-family: "Consolas", "Liberation Mono", "Menlo", "Courier",
            monospace;
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
          background-color: ${theme.scrollThumb};
          border: 3px solid ${theme.background};
          border-radius: 7px;
          background-clip: padding-box;
        }

        ::-webkit-scrollbar-track-piece {
          background-color: ${theme.scrollTrack};
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
