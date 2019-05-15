import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: "Whitney", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    line-height: 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
  }

  code {
    font-family: "Consolas", "Liberation Mono", "Menlo", "Courier", monospace;
  }

  ::-webkit-scrollbar {
    width: 14px;
    height: 14px;
    background-color: ${(props) => props.theme.background};
  }

  ::-webkit-scroll-corner {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.scrollThumb};
    border: 3px solid ${(props) => props.theme.background};
    border-radius: 7px;
    background-clip: padding-box;
  }

  ::-webkit-scrollbar-track-piece {
    background-color: ${(props) => props.theme.scrollTrack};
    border: 3px solid ${(props) => props.theme.background};
    border-radius: 7px;
  }

  ::-webkit-resizer {
    background-color: ${(props) => props.theme.background};
  }
`
