/* eslint-disable import/no-cycle */

import { destroy, Instance, SnapshotOrInstance, types } from "mobx-state-tree"
import { MessageLike, MessageModel } from "../message/state/models/MessageModel"
import { WebhookModel } from "../webhook/WebhookModel"

export const EditorManager = types
  .model("EditorManager", {
    messages: types.late(() => types.array(MessageModel)),
    target: types.optional(
      types.late(() => WebhookModel),
      {},
    ),
  })
  .actions(self => ({
    set<K extends keyof typeof self>(
      key: K,
      value: SnapshotOrInstance<typeof self[K]>,
    ) {
      self[key] = value
    },

    clear() {
      self.messages.clear()
      self.messages.push(MessageModel.create())
    },

    async save() {
      for (const message of self.messages) {
        const headers: Record<string, string> = {
          "Accept": "application/json",
          "Accept-Language": "en",
        }

        const [method, url] = self.target.getRoute(message.reference)

        const body = message.body
        if (typeof body === "string") {
          headers["Content-Type"] = "application/json"
        }

        /* eslint-disable no-await-in-loop */
        const response = await fetch(url, { method, headers, body })
        const data = await response.json()
        /* eslint-enable no-await-in-loop */

        console.log("Target executed", data)
      }

      return null
    },

    async process(path: string) {
      if (path === "/target/url") {
        await self.target.fetch()

        if (self.target.exists ?? true) {
          return { errorValidations: [{ id: "target", messages: [] }] }
        }

        return {
          errorValidations: [
            {
              id: "target",
              messages: [{ path, message: "Webhook does not exist" }],
            },
          ],
        }
      }

      return {}
    },
  }))

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/consistent-type-definitions
export interface EditorManagerLike extends Instance<typeof EditorManager> {}
