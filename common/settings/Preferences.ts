import type { Appearance } from "../theming/Appearance"

export type Preferences = {
  color: Appearance["color"]
  display: Appearance["display"]
  fontSize: Appearance["fontSize"]
  confirmExit: boolean
  expandSections: boolean
}
