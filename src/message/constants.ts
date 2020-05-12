import type { MessageData } from "./types/MessageData"

export const MAX_FIELDS_PER_ROW = 3
export const FIELD_GRID_SIZE = 12

export const INITIAL_MESSAGE_DATA: MessageData = {
  content:
    "Welcome to <:discohook:694285995394203759>Discohook, a free message and embed builder for Discord!\nThere's additional info in the embeds below, or you can use the *Clear all* button in the editor to start making embeds.\nHave questions? Discohook has a support server at <https://discohook.org/discord>.",
  embeds: [
    {
      title: "What's all this?",
      description:
        "Discohook is a free tool that allows you to build Discord messages and embeds for use in your server.\n\nDiscohook sends messages using *webhooks*, an API feature that allows third-party services to *blindly* send messages into text channels. While webhooks can send messages, they cannot respond to user interactions such as messages.",
      color: 7506394,
    },
    {
      title: "Text formatting how-tos",
      description:
        "There are a few basic styles you can take advantage of:\n*Italics*, by surrounding text in asterisks (\\*);\n**Bold**, by surrounding text in double asterisks (\\*\\*);\n__Underline__, by using double underscores (\\_\\_);\n~~Strikethrough~~, by using double tildes (\\~\\~);\n`Code`, by using backticks (\\`).",
      color: 4437377,
      fields: [
        {
          name: "Advanced formatting",
          value:
            "Beyond these basic styles, you can also start a blockquote with a right-pointing angle bracket (>):\n> Hello.\nOr mark sensitive content behind a spoiler using two vertical bars (\\||):\n||This is hidden until clicked||",
        },
        {
          name: "Using server emoji",
          value:
            "While default emoji work like you would expect them to, server emotes are a bit more complicated.\n\nTo send a server emoji with a webhook, you must use a specific formatting code to do so. To find it, send that emoji in your server, but put a backslash (\\\\) in front of it.\n\nFor example: sending `\\:my_emoji:` would send `<:my_emoji:12345>` into chat. If you copy the output into Discohook, the emoji will show up properly.",
        },
        {
          name: "Pinging users and roles, linking to channels",
          value:
            "First of all, you must have enabled developer mode in Discord's settings. To do so, open Discord settings and navigate to Appearance. There will be a Developer Mode toggle under the Advanced section, which you must enable.\n\nHaving developer mode enabled, you can now right-click your target to copy their ID. Keep in mind that for users, you must right click their *avatar*, not the message.\n\nTo mention them, you have to use Discord's mention syntax:\n`<@!user_id>`, `<@&role_id>`, or `<#channel_id>`. If done correctly, they will appear as <@!143419667677970434> in the preview.",
        },
      ],
    },
    {
      title: "Additional magic",
      color: 16426522,
      fields: [
        {
          name: "Image galleries",
          value:
            'With some special magic, you can have up to 4 images in a single embed. This feature is exclusive to webhooks, so don\'t expect to make it work on a traditional bot.\n\nAll you need is to give your embed a URL and click on the "Edit images" button inside any embed to get started.',
        },
        {
          name: "Backups",
          value:
            "Not only can Discohook send messages, but Discohook can also save them for later use. For when your message wasn't quite right.\nFor convenience, backups also contain the webhook URL.\n\nBackups will not be sent to the Discohook, and will always be stored offline. If you clear your browsing data, your backups will be lost *forever*!\n\nIf you want to keep your backups somewhere else, you can export backups to get a saved copy. Do keep in mind that they also include the stored webhook URL, so don't share it with anyone you don't trust.",
        },
      ],
    },
    {
      title: "Legal things",
      description:
        'To make Discohook as helpful as it can be, we use some assets derived from Discord\'s application. Discohook has no affiliation with Discord in any way, shape, or form.\n\nThe source code to this app is [available on GitHub](https://github.com/discohook/discohook) licensed under the GNU Affero General Public License v3.0.\nIf you need to contact me, you can join the [support server](https://discohook.org/discord), or send an email to "hello" at discohook.org.',
      color: 15746887,
    },
  ],
}
