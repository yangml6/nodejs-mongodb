const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session');

const models_path = require('./public/javascripts/models/TestModel');
const usersJS = require('./public/javascripts/controllers/users');

const fs = require('fs');//文件读写、复制、删除、重命名
const path = require('path');

const index = require('./routes/index')
const users = require('./routes/users')
const router = require('./public/javascripts/controllers/router')

const mongoose = require('./public/javascripts/controllers/userHelp');


const model_x = models_path()


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(session(app));
app.use(views(__dirname + '/views', {
  map : {html : 'ejs'}
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

/**
 * 使用路由转发请求
 * @type {[type]}
 */

app.use(router.routes());
console.log("------000------")
app.use(router.allowedMethods());
// // routes
app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
