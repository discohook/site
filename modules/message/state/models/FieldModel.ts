/* eslint-disable import/no-cycle */

import {
  getParentOfType,
  Instance,
  SnapshotOrInstance,
  types,
} from "mobx-state-tree"
import { getUniqueId } from "../../../../common/state/uid"
import { EmbedLike, EmbedModel } from "./EmbedModel"

export const FieldModel = types
  .model("FieldModel", {
    id: types.optional(types.identifierNumber, getUniqueId),
    name: "",
    value: "",
    inline: false,
  })
  .views(self => ({
    get embed(): EmbedLike {
      return getParentOfType(self, EmbedModel)
    },

    get displayName() {
      /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
      return (
        self.name
          .split("\n")
          .map(line => line.trim())
          .find(Boolean) ||
        self.value
          .split("\n")
          .map(line => line.trim())
          .find(Boolean) ||
        undefined
      )
      /* eslint-enable @typescript-eslint/prefer-nullish-coalescing */
    },
  }))
  .actions(self => ({
    set<K extends keyof typeof self>(
      key: K,
      value: SnapshotOrInstance<typeof self[K]>,
    ): void {
      self[key] = value
    },
  }))

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/consistent-type-definitions
export interface FieldLike extends Instance<typeof FieldModel> {}
