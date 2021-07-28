import { Instance, SnapshotOrInstance, types } from "mobx-state-tree";
import { getUniqueId } from "../../../../common/state/uid";

export const AttachmentModel = types
    .model("AttachmentModel", {
        id: types.optional(types.identifier, () => getUniqueId().toString()),
        filename: "",
        size: 0,
        url: "",
        contentType: "",
        local: true
    })
    .volatile(() => ({
        file: undefined as File | undefined,
    }))
    .actions(self => ({
        set<K extends keyof typeof self>(
            key: K,
            value: SnapshotOrInstance<typeof self[K]>,
        ): void {
            self[key] = value
        }
    }))

export const isLocal = (attachment: AttachmentLike): attachment is AttachmentLike & { local: true, file: File } => attachment.local && Boolean(attachment.file)
export const isNotLocal = (attachment: AttachmentLike): attachment is AttachmentLike & { local: false, file: undefined } => !attachment.local && !attachment.file

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/consistent-type-definitions
export interface AttachmentLike extends Instance<typeof AttachmentModel> { }