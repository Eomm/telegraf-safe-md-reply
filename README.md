# telegraf-safe-md-reply

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![ci](https://github.com/Eomm/telegraf-safe-md-reply/actions/workflows/ci.yml/badge.svg)](https://github.com/Eomm/telegraf-safe-md-reply/actions/workflows/ci.yml)

Reply safely with markdown!

Are you tired of this error?!

```
"type": "TelegramError",
"message": "400: Bad Request: can't parse entities: Character '-' is reserved and must be escaped with the preceding '\\'",
```

This package is for you!

## Usage

The `telegraf-safe-md-reply` middleware will add new methods to the `ctx` object:

- `replyWithSafeMarkdownV2`: reply with markdown escaping all the reserved characters
- `escapeMarkdown`: escape a string escaping all the reserved markdown characters

```js
const Telegraf = require('telegraf')
const safeReply = require('telegraf-safe-md-reply')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(safeReply())

bot.command('test', async (ctx) => {
  // use the new method to reply
  ctx.replyWithSafeMarkdownV2('Hello-World(?)')

  // or escape manually:
  ctx.replyWithMarkdownV2(`*Hello*${ctx.escapeMarkdown('-World(?)')}`)
})
```

## Options

You can pass an object with options to the middleware:

```js
bot.use(safeReply({
  methodName: 'safeReply'
}))

bot.command('test', (ctx) => {
  ctx.safeReply('Hello-World(?)')
})
```


## License

Copyright [Manuel Spigolon](https://github.com/Eomm), Licensed under [MIT](./LICENSE).
