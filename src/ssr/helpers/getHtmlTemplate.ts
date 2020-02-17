import isBot from "isbot"
import { RAW_TEMPLATE } from "../constants"

export const getHtmlTemplate = (userAgent: string) => {
  let template = RAW_TEMPLATE

  if (isBot(userAgent)) {
    template = template
      .replace(/<script type="[^"]*" src="[^"]*"><\/script>/g, "<!-- $& -->")
      .replace(/<link [^>]* rel="preload">/g, "<!-- $& -->")
  }

  return template
    .replace('<div id="app"></div>', '<div id="app">{app}</div>')
    .split("{app}")
}
