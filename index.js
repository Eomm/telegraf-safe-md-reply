'use strict'

module.exports = function helpMiddleware ({
  methodName = 'replyWithSafeMarkdownV2'
} = {}) {
  return function middleware (ctx, next) {
    ctx[methodName] = function (text, extra) {
      return ctx.replyWithMarkdownV2(escapeMarkdown(text), extra)
    }

    ctx.escapeMarkdown = escapeMarkdown

    return next()
  }
}

// https://core.telegram.org/bots/api#markdownv2-style
const SPECIAL_CHARS = [
  '\\', '_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'
]

const regex = new RegExp(`[${SPECIAL_CHARS.join('\\')}]`, 'ig')

function escapeMarkdown (text) {
  return text.replace(regex, '\\$&')
}
