export type ColorTheme = {
  accent: {
    primary: string
    success: string
    warning: string
    danger: string
  }
  header: {
    primary: string
    secondary: string
  }
  text: {
    normal: string
    muted: string
    link: string
  }
  interactive: {
    normal: string
    hover: string
    active: string
    muted: string
  }
  background: {
    primary: string
    secondary: string
    tertiary: string
    accent: string
    floating: string
  }
  backgroundModifier: {
    hover: string
    active: string
    selected: string
    accent: string
  }
  font: {
    sans: string
    mono: string
  }
  elavation: {
    stroke: string
    low: string
    medium: string
    high: string
  }
}
