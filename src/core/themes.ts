const common = {
  accent: "#7289da",

  green: "#43b581",
  yellow: "#faa61a",
  red: "#f04747",

  fonts: {
    sans: [
      "Whitney",
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
    mono: [
      "Consolas",
      "Andale Mono WT",
      "Andale Mono",
      "Lucida Console",
      "Lucida Sans Typewriter",
      "DejaVu Sans Mono",
      "Bitstream Vera Sans Mono",
      "Liberation Mono",
      "Nimbus Mono L",
      "Monaco",
      "Courier New",
      "Courier",
      "monospace",
    ].join(","),
  },
}

export const darkTheme = {
  ...common,

  header: {
    primary: "#ffffff",
    secondary: "#b9bbbe",
  },

  text: {
    normal: "#dcddde",
    muted: "#72767d",
    link: "#00b0f4",
  },

  interactive: {
    normal: "#b9bbbe",
    hover: "#dcddde",
    active: "#ffffff",
    muted: "#4f545c",
  },

  background: {
    primary: "#36393f",
    secondary: "#2f3136",
    tertiary: "#202225",
    accent: "#4f545c",
    floating: "#18191c",
  },

  backgroundModifier: {
    hover: "rgba(79, 84, 92, 0.16)",
    active: "rgba(79, 84, 92, 0.24)",
    selected: "rgba(79, 84, 92, 0.32)",
    accent: "rgba(255, 255, 255, 0.06)",
  },

  textAreaBackground: "#40444b",
}

export const lightTheme: typeof darkTheme = {
  ...common,

  header: {
    primary: "#060607",
    secondary: "#4f5660",
  },

  text: {
    normal: "#2e3338",
    muted: "#747f8d",
    link: "#0067e0",
  },

  interactive: {
    normal: "#4f5660",
    hover: "#2e3338",
    active: "#060607",
    muted: "#c7ccd1",
  },

  background: {
    primary: "#ffffff",
    secondary: "#f2f3f5",
    tertiary: "#e3e5e8",
    accent: "#747f8d",
    floating: "#ffffff",
  },

  backgroundModifier: {
    hover: "rgba(116, 127, 141, 0.08)",
    active: "rgba(116, 127, 141, 0.16)",
    selected: "rgba(116, 127, 141, 0.24)",
    accent: "rgba(6, 6, 7, 0.08)",
  },

  textAreaBackground: "#ebedef",
}

export type Theme = typeof darkTheme & {
  display: "cozy" | "compact"
  color: "dark" | "light"
  mobile: boolean
}
