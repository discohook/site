/* eslint-disable import/no-cycle */

import { Instance, SnapshotOrInstance, types } from "mobx-state-tree"
import { MessageModel } from "../message/state/models/MessageModel"
import { WebhookModel } from "../webhook/WebhookModel"

export const EditorManager = types
  .model("EditorManager", {
    messages: types.array(MessageModel),
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
      return self.target.save()
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
