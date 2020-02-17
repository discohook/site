import { MessageData } from "./types/MessageData"

export const MAX_FIELDS_PER_ROW = 3
export const FIELD_GRID_SIZE = 12

export const INITIAL_MESSAGE_DATA: MessageData = {
  content: `
Hey, this is Discohook, a message and embed builder for Discord webhooks. <:discohook:645409602393079819>
You can read more about how to use Discohook below, or click **Clear all** on the top to start out blank.
Have questions? Discohook has a server at <https://discohook.org/discord>.
`.trim(),
  embeds: [
    {
      title: "What is this?",
      description: `
Yeah uhh, this is __Discohook__.

This can help you create and send messages for Discord's webhooks, which you can read more about on the [support article](https://support.discordapp.com/hc/en-us/articles/228383668).
Webhooks got introduced to send messages to a Discord channel from third party applications, without going trough the hassle of setting up a bot.

If you have the "Manage webhooks" permission for a channel, you can create one in the channel settings.
After that, you can copy the link in here and start sending cool and shiny messages.

This application can help you create unique messages that stand out!
These messages can contain a lot more than just text, but also up to 10 embeds like this one! :sparkles:
`.trim(),
      color: 0x7289da,
    },
    {
      title: "What's an embed?",
      description: `
Originally, embeds got introduced to give everyone reading the chat a hint on what a link will be about,
however since then Discord has expanded the feature and started allowing bots and webhooks to take advantage of this feature, too.
In fact, this entire message can be sent to any Discord channel, given you have permission to create a webhook.

Embeds have many shiny features, like the title and description you're reading right now, but also up to 25 "fields", authors, footers, and even more!
On the editor on your left you can set all properties that embeds can have with ease.

Discord also has a few advanced text formatting features, which are explained below :point_down:
`.trim(),
      color: 0x43b581,
    },
    {
      title: "Markdown",
      description: `
Discord has support for [__***markdown***__](https://support.discordapp.com/hc/en-us/articles/210298617), which lets you format text in unique ways.
It's very simple:
- surround your text with \`*\`s to make your text *italic*,
- or use \`**\`s to make your text **bold**,
- or \`__\`s to make your text __underlined__,
- or \`~~\`s to make your text ~~striketrough~~,
- or \`\` \` \`\`s to make your text \`code\`.

Tou can combine multiple styles if you need to, just make sure the order matches up:
\`__**text**__\` results in __**text**__, but \`__**text__**\` results in __**text__**, which is probably not what you want.
`.trim(),
      fields: [
        {
          name: "(Custom) Emoji",
          value: `
You can use (custom) emoji in Discohook too.

To use regular emoji, you can use the emoji shortcode (like \`:closed_umbrella:\`) or copy paste a literal emoji (\`🌂\`)
:closed_umbrella: :closed_umbrella: :closed_umbrella:

You can also use a custom emoji by putting a backslash (\\\\) infront of the emoji when sending a message.
Discord will send your message with the raw formatting required to use emoji in webhooks.
`.trim(),
        },
        {
          name: "Mentioning users, roles, and channels",
          value: `
You can also mention your members, or tag a channel by using this syntax:
\`<@!user-id>\`, \`<@&role-id>\`, or \`<#channel-id>\`.
As an example, to mention someone: \`<@!143419667677970434>\`. Don't include the user, role, or channel name.
If done correctly, it should show <@!1>, <@&1>, or <#1>. Sadly it's impossible to get the channel name inside of Discohook right now, so make sure the ID is correct!

You can get these IDs by going into Discord's appearance settings, and enabling developer mode.
After you enabled that setting, you can right click on a user, role, or channel to copy it's ID!
`.trim(),
        },
        {
          name: "Code blocks",
          value: `
Discord also has support for code blocks. Just wrap your code in 3 backticks (\\\`\\\`\\\`).
It also supports the same basic syntax highlighting options Discord has, by adding a language identifier after the first 3 backticks.
\`\`\`
Code goes here, supposedly
\`\`\`
`.trim(),
        },
        {
          name: "Spoiler tags",
          value: `
Discord has support for ||[spoiler tags](https://support.discordapp.com/hc/en-us/articles/360022320632)|| to help you hide your secrets.
Use them by surrounding your text with 2 vertical bars: \`||Your text||\`.
`.trim(),
        },
        {
          name: "Block quotes",
          value: `
> In a more recent update, discord also got support for block quotes like this one,
> use them by inserting a "> " before your line like this: \`> Your text\`.
`.trim(),
        },
        {
          name: "Masked links",
          value: `
This feature is super exclusive, being restricted to bots and webhooks only.
You can use them using Reddit-style syntax: \`[text](https://example.com/)\` turns into [text](https://example.com/)!
`.trim(),
        },
      ],
      color: 0xfaa61a,
    },
    {
      author: {
        name: "Author",
        iconUrl: "https://discohook.org/assets/discord-avatar-red.png",
      },
      title: "Demo embed",
      url: "https://discordapp.com/",
      description: `
This embed is only here to demonstrate how extensively embeds can be used.
There's not a lot useful words here, only looking.
`.trim(),
      fields: [
        {
          name: "Embeds can have fields",
          value: `
Crazy right?
You can even have inline fields, like the ones below! :arrow_down:
`.trim(),
        },
        {
          name: "Inline fields",
          value: "If you have enough room,",
          inline: true,
        },
        {
          name: "are cool!",
          value: "they appear next to each other",
          inline: true,
        },
        {
          name: "Embeds can even have images",
          value:
            "But they're too bulky for this demo embed, so there isn't one.",
        },
      ],
      footer: {
        text: "There's also footers, and timestamps",
        iconUrl: "https://discohook.org/assets/discord-avatar-red.png",
      },
      timestamp: "2019-04-22T11:02:04.000Z",
      color: 0xf04747,
      thumbnail: {
        url: "https://discohook.org/assets/discord-avatar-red.png",
      },
    },
    /*
    {
      title: "Backups!",
      description: `
As a small extra, you can back up your messages in here.
To get started using them, click on the **Backups** button on the top of the editor!

If you want to share a backup with someone else (or to yourself), you can copy the URL in the address bar.
When you open the URL at a later time, the message will be restored.
`.trim(),
      fields: [
        {
          name: ":warning: Warning",
          value: `
Backups are stored in the browser, and will always be stored there.
This means that if you clear your browsers data your backups will be lost forever!
If you want to keep your backups when clearing your browser data, use the share functionality to copy your backups and store them somewhere safe.
`.trim(),
        },
      ],
      color: 0x747f8d,
    },
    */
    {
      title: "Disclaimer",
      description: `
Discohook makes use of some assets derived or extracted from Discord's application.
This is to make visuals as accurate as possible, and not to infringe on their copyright.
Discohook is not affiliated with Discord in any way, shape, or form.

The source code of this project is [available on GitHub](https://github.com/jaylineko/discohook), under the MIT license.

If you want to contact me, join the [Discohook server](https://discohook.org/discord), message me on Discord (@jay.#1111), or send an email to <hello@jaylineko.com>.
`.trim(),
    },
  ],
}
