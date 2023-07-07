/* eslint-disable import/no-cycle */

import { Instance, SnapshotOrInstance, types } from "mobx-state-tree"
import { delay } from "../../common/state/delay"
import type { DiscordError } from "../../types/DiscordError"
import type { MessageData } from "../message/state/data/MessageData"
import { MessageModel } from "../message/state/models/MessageModel"
import { WebhookModel } from "../webhook/WebhookModel"

export const EditorManager = types
  .model("EditorManager", {
    messages: types.array(types.late(() => MessageModel)),
    targets: types.array(types.late(() => WebhookModel)),
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

    async getMessage(reference: string) {
      for (const target of self.targets) {
        const headers: Record<string, string> = {
          "Accept": "application/json",
          "Accept-Language": "en",
        }

        /* eslint-disable no-await-in-loop */

        const [, url] = await target.getRoute(reference)
        const response = await fetch(url, { method: "GET", headers })
        const data = await response.json()

        if (response.headers.get("X-RateLimit-Remaining") === "0") {
          const retryAfter =
            Number(response.headers.get("X-RateLimit-Reset-After") ?? 2) * 1000

          console.log(
            "Rate limited: delaying next request by",
            retryAfter,
            "milliseconds",
          )

          await delay(retryAfter)
        }

        /* eslint-enable no-await-in-loop */

        console.log("Reference fetched", data)

        if (response.ok) {
          return data as MessageData
        }
      }

      return null
    },

    async save() {
      const errors: DiscordError[] = []
      for (const target of self.targets) {
        for (const message of self.messages) {
          const headers: Record<string, string> = {
            "Accept": "application/json",
            "Accept-Language": "en",
          }

          const body = message.body
          if (typeof body === "string") {
            headers["Content-Type"] = "application/json"
          }

          /* eslint-disable no-await-in-loop */

          const [method, url] = await target.getRoute(message.reference)

          const response = await fetch(url, { method, headers, body })
          const data = await response.json()

          if (response.headers.get("X-RateLimit-Remaining") === "0") {
            const retryAfter =
              Number(response.headers.get("X-RateLimit-Reset-After") ?? 2) *
              1000

            console.log(
              "Rate limited: delaying next request by",
              retryAfter,
              "milliseconds",
            )

            await delay(retryAfter)
          }

          /* eslint-enable no-await-in-loop */

          if (!response.ok) {
            errors.push(data as DiscordError)
          }

          console.log("Target executed", data)
        }
      }

      if (errors.length > 0) {
        throw new Error(JSON.stringify(errors))
      }
      return null
    },

    async process(path: string) {
      const match = /^\/targets\/(\d+)\/url$/.exec(path)
      if (match) {
        const target = self.targets[Number(match[1])]

        await target.fetch()
        if (target.exists ?? true) {
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
