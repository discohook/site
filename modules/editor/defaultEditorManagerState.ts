import type { SnapshotIn } from "mobx-state-tree"
import type { EditorManager } from "./EditorManager"

export const DEFAULT_EDITOR_MANAGER_STATE: SnapshotIn<typeof EditorManager> = {
  messages: [
    {
      content:
        "Hey, welcome to <:discohook:736648398081622016> **Discohook**! The easiest way to personalise your Discord server.\n\nThere's more info below, but you don't have to read it. If you're ready press **Clear All** in the top of the editor to get started.\n\nDiscohook has a [support server](https://discohook.app/discord), if you need help feel free to join in and ask questions, suggest features, or just chat with the community.\n\nWe also have [complementary bot](https://discohook.app/bot) that may help out, featuring reaction roles and other utilities.\n_ _",
      embeds: [
        {
          title: "What's this about?",
          description:
            "Discohook is a free tool that allows you to personalise your server to make your server stand out from the crowd. The main way it does this is using [webhooks](https://support.discord.com/hc/en-us/articles/228383668), which allows services like Discohook to send any messages with embeds to your server.\n\nTo get started with sending messages, you need a webhook URL, you can get one via the \"Integrations\" tab in your server's settings. If you're having issues creating a webhook, [the bot](https://discohook.app/bot) can help you create one for you.\n\nKeep in mind that Discohook can't do automation yet, it only sends messages when you tell it to. If you are looking for an automatic feed or custom commands this isn't the right tool for you.",
          color: {
            hue: 205.14970059880238,
            saturation: 0.6549019607843137,
            value: 1,
          },
        },
        {
          title: "Discord bot",
          description:
            "Discohook has a bot as well, it's not strictly required to send messages it may be helpful to have it ready.\n\nBelow is a small but incomplete overview of what the bot can do for you.",
          color: {
            hue: 205.14970059880238,
            saturation: 0.6549019607843137,
            value: 1,
          },
          fields: [
            {
              name:
                "Getting special formatting for mentions, channels, and emoji",
              value:
                "The **/format** command of the bot can give you special formatting for use in Discord messages that lets you create mentions, tag channels, or use emoji ready to paste into the editor!\n\nThere are [manual ways](https://discord.dev/reference#message-formatting) of doing this, but it's very error prone. The bot will make sure you'll always get the right formatting for your needs.",
            },
            {
              name: "Creating reaction roles",
              value:
                "You can manage reaction roles with the bot using the **/reaction-role** command.\n\nThe set-up process is very intuitive: type out **/reaction-role create**, paste a message link, select an emoji, and pick a role. Hit enter and you're done, your members can now react to any of your messages to pick their roles.",
            },
            {
              name: "Recover Discohook messages from your server",
              value:
                "It can also restore any message sent in your Discord server for you via the apps menu.\n\nTo get started, right-click or long-press on any message in your server, press on apps, and then press **Restore to Discohook**. It'll send you a link that leads to the editor page containing the message you selected!",
            },
            {
              name: "Other features",
              value:
                "Discohook can also grab images from profile pictures or emoji, manage your webhooks, and more. Invite the bot and use **/help** to learn about all the bot offers!",
            },
          ],
        },
      ],
    },
  ],
}
