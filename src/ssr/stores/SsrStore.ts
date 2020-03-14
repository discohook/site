import { Context } from "koa"
import { InitializableStore } from "../../state/classes/InitializableStore"

export class SsrStore extends InitializableStore {
  context?: Context
}
