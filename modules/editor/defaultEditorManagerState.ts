import type { SnapshotIn } from "mobx-state-tree"
import type { EditorManager } from "./EditorManager"

export const DEFAULT_EDITOR_MANAGER_STATE: SnapshotIn<typeof EditorManager> = {
  messages: [
    {
      embeds: [
        {
          title: "What's this?",
          description:
            'This is a free tool to create Discord Embeds. It\'s a fork of [discohook](https://discohook.org), an amazing webhook embed builder. \n\nTo use this, you simply create the embed with the intuitive GUI, and then copy the data in the "JSON Data Editor" button.\n\nOnce you have that, you can use either the `[p]embed store json` command to store the embed in the bot, the `[p]embed json command` to directly send the embed, or the `[p]embed editjson` command to edit an existing embed.\n\nNote: `[p]` is your prefix, my default prefixes are `;` `k!` `k.` and `kao `',
          color: {
            hue: 205.14970059880238,
            saturation: 0.6549019607843137,
            value: 1,
          },
        },
          ],
        },
      ],
    }
