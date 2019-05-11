import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    accent: string
    background: string
    border: string
    text: string
    link: string
    input: string
    action: string
    mention: string
    spoiler: string
    button: {
      enabled: string
      disabled: string
      filled: string
    }
    message: {
      username: string
      content: string
      timestamp: string
    }
    embed: {
      background: string
      pillDefaultFill: string
      border: string
      author: {
        name: string
      }
      title: {
        normal: string
        link: string
      }
      description: string
      field: {
        name: string
        value: string
      }
      footer: {
        text: string
        separator: string
      }
    }
    code: {
      background: string
      border: string
      text: string
      comment: string
      formula: string
    }
  }
}
