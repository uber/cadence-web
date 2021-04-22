// Copyright (c) 2017-2021 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

const path = require('path');
const Koa = require('koa');
const koaBodyparser = require('koa-bodyparser');
const koaCompress = require('koa-compress');
const koaSend = require('koa-send');
const koaStatic = require('koa-static');
const koaWebpack = require('koa-webpack');
const webpack = require('webpack');

const tchannelClient = require('./middleware/tchannel-client');
const router = require('./router');
const webpackConfig = require('../webpack.config');

const staticRoot = path.join(__dirname, '../dist');
const app = new Koa();
app.webpackConfig = webpackConfig;

app.init = function(options) {
  options = options || {};

  const useWebpack =
    'useWebpack' in options
      ? options.useWebpack
      : process.env.NODE_ENV !== 'production';

  let compiler;

  if (useWebpack) {
    compiler = webpack(app.webpackConfig);
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
    .use(koaBodyparser())
    .use(
      koaCompress({
        filter: contentType => !contentType.startsWith('text/event-stream'),
      })
    )
    .use(tchannelClient)
    .use(
      useWebpack
        ? koaWebpack({
            compiler,
            dev: { stats: { colors: true } },
            hot: { port: process.env.TEST_RUN ? 8082 : 8081 },
          })
        : koaStatic(staticRoot)
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
            await koaSend(ctx, 'index.html', { root: staticRoot });
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
