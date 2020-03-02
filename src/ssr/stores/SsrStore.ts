import { Context } from "koa"
import { InitialisableStore } from "../../state/classes/InitialisableStore"

export class SsrStore extends InitialisableStore {
  context?: Context
}
