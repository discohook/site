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
  .views(self => ({
    get hasSentMessages() {
      return self.messages.some(m => m.url)
    },
  }))
  .actions(self => ({
    set<K extends keyof typeof self>(
      key: K,
      value: SnapshotOrInstance<typeof self[K]>,
    ) {
      self[key] = value
    },

    clear() {
      self.messages.clear()
      this.add()
    },

    add() {
      self.messages.push(MessageModel.create())
    },

    delete(message: MessageLike) {
      message.delete()
      destroy(message)
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
