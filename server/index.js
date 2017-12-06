const
  Koa = require('koa'),
  bodyparser = require('koa-bodyparser'),
  send = require('koa-send'),
  path = require('path'),
  staticRoot = path.join(__dirname, '../dist'),
  app = new Koa(),
  router = require('./routes')

app.init = function(ciTest) {
  const production = !!ciTest || process.env.NODE_ENV === 'production'
  if (!production) {
    var Webpack = require('webpack'),
        koaWebpack = require('koa-webpack'),
        compiler = Webpack(require('../webpack.config'))
  }

  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      if (!ciTest) {
        console.error(err)
      }
      ctx.status = err.statusCode || err.status || 500
      ctx.body = { message: err.message }
    }
  })
  .use(bodyparser())
  .use(require('koa-compress')({
    filter: contentType => !contentType.startsWith('text/event-stream')
  }))
  .use(require('./middleware/tchannel-client'))
  .use(production ?
    require('koa-static')(staticRoot) :
    koaWebpack({
      compiler,
      dev: { stats: { colors: true } }
    }))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async function (ctx, next) {
    if (['HEAD', 'GET'].includes(ctx.method) && !ctx.path.startsWith('/api')) {
      try {
        ctx.set('X-Content-Type-Options', 'nosniff')
        ctx.set('X-Frame-Options', 'SAMEORIGIN')
        ctx.set('X-XSS-Protection', '1; mode=block')

        if (production) {
          done = await send(ctx, 'index.html', { root: staticRoot })
        } else {
          var filename = path.join(compiler.outputPath, 'index.html')
          ctx.set('content-type', 'text/html')
          ctx.body = compiler.outputFileSystem.readFileSync(filename)
        }
      } catch (err) {
        if (err.status !== 404) {
          throw err
        }
      }
    }
  })

  return app
}

module.exports = app