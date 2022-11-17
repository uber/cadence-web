// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
