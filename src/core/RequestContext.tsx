import { Context } from "koa"
import { createContext } from "react"

export const RequestContext = createContext<Context | undefined>(undefined)
RequestContext.displayName = "RequestContext"

export const RequestProvider = RequestContext.Provider
export const RequestConsumer = RequestContext.Consumer
