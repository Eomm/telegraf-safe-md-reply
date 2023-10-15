'use strict'

const { test } = require('tap')

const helpMiddleware = require('../index')

test('helpMiddleware', async t => {
  const ctx = {}
  const next = () => Promise.resolve()

  const middleware = helpMiddleware()

  await middleware(ctx, next)

  t.ok(ctx.replyWithSafeMarkdownV2, 'ctx.replyWithSafeMarkdownV2 exists')
  t.ok(ctx.escapeMarkdown, 'ctx.escapeMarkdown exists')
})

test('helpMiddleware with custom methodName', async t => {
  const ctx = {}
  const next = () => Promise.resolve()

  const middleware = helpMiddleware({ methodName: 'replyWithMarkdown' })

  await middleware(ctx, next)

  t.ok(ctx.replyWithMarkdown, 'ctx.replyWithMarkdown exists')
  t.ok(ctx.escapeMarkdown, 'ctx.escapeMarkdown exists')
})

test('replyWithSafeMarkdownV2', async t => {
  const ctx = {
    replyWithMarkdownV2: (text, extra) => {
      // echo
      return text
    }
  }
  const next = () => Promise.resolve()

  const middleware = helpMiddleware()

  await middleware(ctx, next)

  t.equal(ctx.replyWithSafeMarkdownV2('foo_bar'), 'foo\\_bar')
  t.equal(ctx.replyWithSafeMarkdownV2('foo*bar'), 'foo\\*bar')
  t.equal(ctx.replyWithSafeMarkdownV2('foo[bar'), 'foo\\[bar')
  t.equal(ctx.replyWithSafeMarkdownV2('foo`bar'), 'foo\\`bar')
  t.equal(ctx.replyWithSafeMarkdownV2('foo_bar*'), 'foo\\_bar\\*')
  t.equal(ctx.replyWithSafeMarkdownV2('foo_bar*'), 'foo\\_bar\\*')
  t.equal(ctx.replyWithSafeMarkdownV2('foo_bar*'), 'foo\\_bar\\*')
  t.equal(ctx.replyWithSafeMarkdownV2('foo_bar*'), 'foo\\_bar\\*')
  t.equal(ctx.replyWithSafeMarkdownV2('foo_bar*'), 'foo\\_bar\\*')
  t.equal(ctx.replyWithSafeMarkdownV2('foo_bar*'), 'foo\\_bar\\*')
  t.equal(ctx.replyWithSafeMarkdownV2('foo_bar*'), 'foo\\_bar\\*')
  t.equal(ctx.replyWithSafeMarkdownV2('foo_bar*'), 'foo\\_bar\\*')
  t.equal(ctx.replyWithSafeMarkdownV2('foo_bar*'), 'foo\\_bar\\*')
})

test('escapeMarkdown', async t => {
  const ctx = {}
  const next = () => Promise.resolve()

  const middleware = helpMiddleware()

  await middleware(ctx, next)

  t.equal(ctx.escapeMarkdown('foo_bar'), 'foo\\_bar')
  t.equal(ctx.escapeMarkdown('foo*bar'), 'foo\\*bar')
  t.equal(ctx.escapeMarkdown('foo[bar'), 'foo\\[bar')
  t.equal(ctx.escapeMarkdown('foo`bar'), 'foo\\`bar')
  t.equal(ctx.escapeMarkdown('foo_bar*'), 'foo\\_bar\\*')
  t.equal(ctx.escapeMarkdown('foo_bar*'), 'foo\\_bar\\*')
  t.equal(ctx.escapeMarkdown('foo_bar*'), 'foo\\_bar\\*')
  t.equal(ctx.escapeMarkdown('foo_bar*'), 'foo\\_bar\\*')
  t.equal(ctx.escapeMarkdown('foo_bar*'), 'foo\\_bar\\*')
  t.equal(ctx.escapeMarkdown('foo_bar*'), 'foo\\_bar\\*')
  t.equal(ctx.escapeMarkdown('foo_bar*'), 'foo\\_bar\\*')
  t.equal(ctx.escapeMarkdown('foo_bar*'), 'foo\\_bar\\*')
  t.equal(ctx.escapeMarkdown('foo_bar*'), 'foo\\_bar\\*')
})
