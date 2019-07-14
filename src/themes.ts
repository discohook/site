type ColorTheme = typeof darkTheme
export type Theme = ColorTheme & { display: "cozy" | "compact" }

const common = {
  accent: "#7289da",

  green: "#43b581",
  yellow: "#faa61a",
  red: "#f04747",

  fonts: {
    normal: "'Whitney', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;",
    code: "'Consolas', 'Liberation Mono', 'Menlo', 'Courier', monospace;",
  },

  message: {
    attachment: {
      fileName: "#00b0f4",
      fileSize: "#72767d",

      download: "#4f545c",
      downloadHover: "#595d63",
    },
  },
}

export const darkTheme = {
  ...common,

  background: "#36393f",
  text: "#dcddde",
  important: "#ffffff",
  link: "#0096cf",

  editor: {
    input: "#484c52",
    border: "#1e1f23",

    button: {
      enabled: "#ffffff",
      disabled: "rgba(255, 255, 255, 0.6)",
      filled: "#ffffff",
    },
  },

  message: {
    username: "#ffffff",
    content: "#dcddde",
    timestamp: "#5e6165",

    mention: {
      normal: "#3c414f",
      normalText: "#7289da",
      hover: "#6071ac",
      hoverText: "#ffffff",
    },

    embed: {
      background: "#34363c",
      border: "#313338",
      pillDefaultFill: "#4f545c",

      author: "#ffffff",
      title: "#ffffff",
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

    attachment: {
      ...common.message.attachment,

      background: "#34373c",
      border: "#313338",
    },

    spoiler: "#4b4d53",
  },

  scrollBar: {
    thumb: "#202225",
    track: "#2f3136",
  },
}

export const lightTheme: ColorTheme = {
  ...common,

  background: "#ffffff",
  text: "#747f8d",
  important: "#4f545c",
  link: "#00b0f4",

  editor: {
    input: "#f6f6f7",
    border: "#c5c6c9",

    button: {
      enabled: "#4f545c",
      disabled: "rgba(79, 84, 92, 0.6)",
      filled: "#ffffff",
    },
  },

  message: {
    username: "#23262a",
    content: "#747f8d",
    timestamp: "#99aab5",

    mention: {
      normal: "#f1f3fb",
      normalText: "#7289da",
      hover: "#7289da",
      hoverText: "#ffffff",
    },

    embed: {
      background: "#fdfdfd",
      border: "#eeeeee",
      pillDefaultFill: "#cacbce",

      author: "#4f545c",
      title: "#4f545c",
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

    attachment: {
      ...common.message.attachment,

      background: "#ffffff",
      border: "#f6f6f7",
    },

    spoiler: "#e5e5e5",
  },

  scrollBar: {
    thumb: "#7289da",
    track: "#f6f6f7",
  },
}
