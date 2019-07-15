import { Message } from "./message/Message"
import { getUniqueId, id } from "./uid"

export const initialMessage: Message = {
  content: [
    "Hey, this is Discohook, a message builder for Discord webhooks. <:discohook:600312020192985088>",
    "You can read through my small introduction to this project below, or click the **Clear all** button on the top to get started.",
  ].join("\n"),
  embeds: [
    {
      [id]: getUniqueId(),
      title: "What is this?",
      description: [
        "Yeah uhh, this is __Discohook__.",
        "",
        "This can help you create and send messages for Discord's webhooks, which you can read more about on the [support article]" +
          "(https://support.discordapp.com/hc/en-us/articles/228383668).",
        "Webhooks are made to send messages to a Discord channel from third party applications, without setting up a bot.",
        "If you have the 'Manage webhooks' permission, you can create one in the channel settings, copy the link in here and go wild!",
        "",
        "This application can help you create unique messages that stand out!",
        "These messages can not only contain a simple message in plain text, but also up to 10 embeds (like this one). :sparkles:",
      ].join("\n"),
      color: 7506394,
    },
    {
      [id]: getUniqueId(),
      title: "What's an embed?",
      description: [
        "Embeds were originally made to give you a hint to where a link will take you,",
        "however since then Discord has expanded the feature and allowed bots and webhooks to take advantage of it too.",
        "",
        "Embeds can not only have a few basic fields such as a title and a description, but also up to 25 fields, an author, and even more!",
        "In the editor on the left you can set all the properties an embed can have with relative ease.",
        "You can see a very nice embed with most of it's fields set below! :point_down:",
      ].join("\n"),
      color: 4437377,
    },
    {
      [id]: getUniqueId(),
      author: {
        name: "Author",
        iconUrl: "https://cdn.discordapp.com/embed/avatars/4.png",
      },
      title: "Title(s can have links)",
      url: "https://discordapp.com/",
      description: [
        "This embed is for showing off all these cool embed features.",
        "",
        [
          "Also, this should be obvious by now, this supports",
          "Discord's flavour of [__***markdown***__](https://support.discordapp.com/hc/en-us/articles/210298617),",
          "including ||[spoiler tags](https://support.discordapp.com/hc/en-us/articles/360022320632)||",
          "and masked links like this: `[Cool embed builder](https://discohook.jaylineko.com/)`.",
        ].join(" "),
      ].join("\n"),
      fields: [
        {
          [id]: getUniqueId(),
          name: "Embeds can have fields",
          value: [
            "Crazy right?",
            "You can even have inline fields, like the ones below! :arrow_down:",
          ].join("\n"),
        },
        {
          [id]: getUniqueId(),
          name: "Inline fields",
          value: "If you have enough room,",
          inline: true,
        },
        {
          [id]: getUniqueId(),
          name: "are cool!",
          value: "they appear next to each other",
          inline: true,
        },
        {
          [id]: getUniqueId(),
          name: "Embeds can even have images",
          value: "However it makes your embeds very big, so I didn't add one.",
        },
      ],
      footer: {
        text: "Even a footer, with an optional icon and timestamp",
        iconUrl: "https://cdn.discordapp.com/embed/avatars/4.png",
      },
      timestamp: "2019-04-22T11:02:04.000Z", // GitHub repo creation date
      color: 15746887,
      thumbnail: {
        url: "https://cdn.discordapp.com/embed/avatars/4.png",
      },
    },
    {
      [id]: getUniqueId(),
      title: "Backups!",
      description: [
        "As a small extra, you can back up your messages in here.",
        "To get started using them, click on the **Backups** button on the top of the editor!",
        "",
        ":bangbang: Backups are stored in the browser, and will always be stored there.",
        "This means that if you clear your browsers data your backups will be lost forever!",
      ].join("\n"),
      color: 16426522,
    },
    {
      [id]: getUniqueId(),
      title: ":warning: Small disclaimer",
      description: [
        "Discohook makes use of some assets derived or extracted from Discord's application.",
        "This is to make visuals as accurate as possible, and not to infringe on their copyright.",
        "Discohook is not affiliated with Discord in any way, shape, or form.",
        "",
        "The source code of this project is available on [GitHub](https://github.com/jaylineko/discohook), under the MIT license.",
      ].join("\n"),
    },
  ],
}
