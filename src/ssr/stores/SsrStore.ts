import type { Context } from "koa"
import { InitializableStore } from "../../state/classes/InitializableStore"
import type { Stores } from "../../state/types/Stores"

export class SsrStore extends InitializableStore<Stores> {
  context?: Context
}
