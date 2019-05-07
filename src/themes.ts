import { DefaultTheme } from "styled-components"

export const darkTheme: DefaultTheme = {
  accent: "#7289da",
  background: "#36393f",
  border: "#1e1f23",
  text: "#dcddde",
  link: "#0096cf",
  input: "#484c52",
  action: "#ffffff",
  button: {
    enabled: "#ffffff",
    disabled: "rgba(255, 255, 255, 0.6)",
    filled: "#ffffff",
  },
  message: {
    username: "#ffffff",
    content: "#dcddde",
    timestamp: "#5e6165",
  },
  embed: {
    background: "#34363c",
    pillDefaultFill: "#4f545c",
    border: "#313338",
    author: {
      name: "#ffffff",
    },
    title: {
      normal: "#ffffff",
      link: "#0096cf",
    },
    description: "#aeafb1",
    field: {
      name: "#ffffff",
      value: "#aeafb1",
    },
    footer: {
      text: "#aeafb1",
      separator: "#4f545c",
    },
  },
  code: {
    background: "#2f3136",
    border: "#2b2c31",
    text: "#839496",
    comment: "#586e75",
    formula: "#073642",
  },
}

export const lightTheme: DefaultTheme = {
  accent: "#7289da",
  background: "#ffffff",
  border: "#c5c6c9",
  text: "#747f8d",
  link: "#00b0f4",
  input: "#f6f6f7",
  action: "#4f545c",
  button: {
    enabled: "#4f545c",
    disabled: "rgba(79, 84, 92, 0.6)",
    filled: "#ffffff",
  },
  message: {
    username: "#23262a",
    content: "#747f8d",
    timestamp: "#99aab5",
  },
  embed: {
    background: "#fdfdfd",
    pillDefaultFill: "#cacbce",
    border: "#eeeeee",
    author: {
      name: "#4f545c",
    },
    title: {
      normal: "#4f545c",
      link: "#00b0f4",
    },
    description: "#60646b",
    field: {
      name: "#36393f",
      value: "#36393f",
    },
    footer: {
      text: "#94979c",
      separator: "#cacbce",
    },
  },
  code: {
    background: "#f8f9f9",
    border: "#ebedef",
    text: "#657b83",
    comment: "#93a1a1",
    formula: "#eee8d5",
  },
}
