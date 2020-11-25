const path = require('path'),
  Koa = require('koa'),
  bodyparser = require('koa-bodyparser'),
  send = require('koa-send'),
  staticRoot = path.join(__dirname, '../dist'),
  app = new Koa(),
  router = require('./routes');

app.webpackConfig = require('../webpack.config');

app.init = function(options) {
  options = options || {};

  const useWebpack =
    'useWebpack' in options
      ? options.useWebpack
      : process.env.NODE_ENV !== 'production';

  let koaWebpack;
  let compiler;

  if (useWebpack) {
    const Webpack = require('webpack');

    koaWebpack = require('koa-webpack');
    compiler = Webpack(app.webpackConfig);
  }

  app
    .use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        if (
          options.logErrors !== false &&
          (typeof err.statusCode !== 'number' || err.statusCode >= 500)
        ) {
          console.error(err);
        }

        ctx.status = err.statusCode || err.status || 500;
        ctx.body = { message: err.message };
      }
    })
    .use(bodyparser())
    .use(
      require('koa-compress')({
        filter: contentType => !contentType.startsWith('text/event-stream'),
      })
    )
    .use(require('./middleware/tchannel-client'))
    .use(
      useWebpack
        ? koaWebpack({
            compiler,
            dev: { stats: { colors: true } },
            hot: { port: process.env.TEST_RUN ? 8082 : 8081 },
          })
        : require('koa-static')(staticRoot)
    )
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async function(ctx, next) {
      if (
        ['HEAD', 'GET'].includes(ctx.method) &&
        !ctx.path.startsWith('/api')
      ) {
        try {
          ctx.set('X-Content-Type-Options', 'nosniff');
          ctx.set('X-Frame-Options', 'SAMEORIGIN');
          ctx.set('X-XSS-Protection', '1; mode=block');

          if (useWebpack) {
            const filename = path.join(compiler.outputPath, 'index.html');

            ctx.set('content-type', 'text/html');
            ctx.body = compiler.outputFileSystem.readFileSync(filename);
          } else {
            await send(ctx, 'index.html', { root: staticRoot })
          }
        } catch (err) {
          if (err.status !== 404) {
            throw err;
          }
        }
      }
    });

  return app;
};

module.exports = app;
