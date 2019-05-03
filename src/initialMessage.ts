import { Message } from "./message/Message"

export const initialMessage: Message = {
  content:
    "this `supports` __a__ **subset** *of* ~~markdown~~ 😃 ```js\nfunction foo(bar) {\n  console.log(bar);\n}\n\nfoo(1);```\nWhen sending webhooks, you can have [masked links](https://discordapp.com) in here!",
  embeds: [
    {
      title: "title ~~(did you know you can have markdown here too?)~~",
      description:
        "this supports [named links](https://discordapp.com) on top of the previously shown subset of markdown. ```\nyes, even code blocks```",
      url: "https://discordapp.com",
      color: 3846305,
      timestamp: "2019-04-26T09:55:01.803Z",
      footer: {
        iconUrl: "https://cdn.discordapp.com/embed/avatars/0.png",
        text: "footer text",
      },
      thumbnail: {
        url: "https://cdn.discordapp.com/embed/avatars/0.png",
      },
      image: {
        url: "https://cdn.discordapp.com/embed/avatars/0.png",
      },
      author: {
        name: "author name",
        url: "https://discordapp.com",
        iconUrl: "https://cdn.discordapp.com/embed/avatars/0.png",
      },
      fields: [
        {
          name: "🤔",
          value: "some of these properties have certain limits...",
        },
        {
          name: "😱",
          value: "try exceeding some of them!",
        },
        {
          name: "🙄",
          value:
            "an informative error should show up, and this view will remain as-is until all issues are fixed",
        },
        {
          name: "<:thonkang:219069250692841473>",
          value: "these last two",
          inline: true,
        },
        {
          name: "<:thonkang:219069250692841473>",
          value: "are inline fields",
          inline: true,
        },
      ],
    },
    {
      title: "Woah",
      description:
        "You can also have multiple embeds!\n**NOTE**: The color picker does not work with multiple embeds (yet).",
    },
  ],
}
