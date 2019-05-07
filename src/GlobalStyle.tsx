import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  body {
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
`
