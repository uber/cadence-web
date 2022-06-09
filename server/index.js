// Copyright (c) 2017-2022 Uber Technologies Inc.
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
const process = require('process');
const Koa = require('koa');
const koaBodyparser = require('koa-bodyparser');
const koaCompress = require('koa-compress');
const koaSend = require('koa-send');
const koaStatic = require('koa-static');
const koaWebpack = require('koa-webpack');
const webpack = require('webpack');
const jwt = require('jsonwebtoken');

const webpackConfig = require('../webpack.config');
const grpcClient = require('./middleware/grpc-client');
const tchannelClient = require('./middleware/tchannel-client');
const router = require('./router');
const {
  PEERS_DEFAULT,
  REQUEST_RETRY_FLAGS_DEFAULT,
  REQUEST_RETRY_LIMIT_DEFAULT,
  REQUEST_TIMEOUT_DEFAULT,
  SERVICE_NAME_DEFAULT,
  TRANSPORT_CLIENT_TYPE_DEFAULT,
} = require('./constants');

const staticRoot = path.join(__dirname, '../dist');
const app = new Koa();
const transportClients = {
  tchannel: tchannelClient,
  grpc: grpcClient,
};

app.webpackConfig = webpackConfig;

app.init = function({
  logErrors,
  peers = process.env.CADENCE_TCHANNEL_PEERS || PEERS_DEFAULT,
  retryFlags = REQUEST_RETRY_FLAGS_DEFAULT,
  retryLimit = process.env.CADENCE_TCHANNEL_RETRY_LIMIT ||
    REQUEST_RETRY_LIMIT_DEFAULT,
  serviceName = process.env.CADENCE_TCHANNEL_SERVICE || SERVICE_NAME_DEFAULT,
  timeout = REQUEST_TIMEOUT_DEFAULT,
  transportClientType = process.env.TRANSPORT_CLIENT_TYPE ||
    TRANSPORT_CLIENT_TYPE_DEFAULT, // 'tchannel', 'grpc'
  useWebpack = process.env.NODE_ENV !== 'production',
  enableAuth = process.env.ENABLE_AUTH === 'true',
  authType = process.env.AUTH_TYPE,
  authAdminJwtPrivateKey = process.env.AUTH_ADMIN_JWT_PRIVATE_KEY,
} = {}) {
  const requestConfig = {
    retryFlags,
    retryLimit,
    serviceName,
    timeout,
  };

  const transportClient = transportClients[transportClientType];

  if (!transportClient) {
    throw new Error(
      `Unexpected transport client "${transportClientType}". Only support 'tchannel' or 'grpc'.`
    );
  }

  let compiler;

  if (useWebpack) {
    compiler = webpack(app.webpackConfig);
  }

  process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  });

  app
    .use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        if (
          logErrors !== false &&
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
    .use(async function(ctx, next) {
      if (enableAuth && authType === 'ADMIN_JWT' && authAdminJwtPrivateKey) {
        ctx.authTokenHeaders = ctx.authTokenHeaders || {};
        const token = jwt.sign(
          { admin: true, ttl: 10 },
          authAdminJwtPrivateKey,
          {
            algorithm: 'RS256',
          }
        );

        ctx.authTokenHeaders['cadence-authorization'] = token;
      }

      await next();
    })
    .use(transportClient({ peers, requestConfig }))
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
