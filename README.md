# Cadence Web UI

[![Build Status](https://github.com/uber/cadence-web/actions/workflows/build.yml/badge.svg)](https://github.com/uber/cadence-web/actions/workflows/build.yml) [![Docker Status](https://github.com/uber/cadence-web/actions/workflows/docker_publish.yml/badge.svg)](https://hub.docker.com/r/ubercadence/web/tags)

Cadence is a distributed, scalable, durable, and highly available orchestration engine we developed at Uber Engineering to execute asynchronous long-running business logic in a scalable and resilient way.

This web UI is used to view workflows from [Cadence][cadence], see what's running, and explore and debug workflow executions.

![Demo Usage](https://s3-us-west-2.amazonaws.com/uber-common-public/svc-cadence-web/cadence-web.demo.gif)

## Getting Started

### Configuration

Set these environment variables if you need to change their defaults

| Variable                  | Description                                   | Default           |
| ------------------------- | --------------------------------------------- | ----------------- |
| CADENCE_TCHANNEL_PEERS    | Comma-delmited list of tchannel peers         | 127.0.0.1:7933    |
| CADENCE_TCHANNEL_SERVICE  | Name of the cadence tchannel service to call  | cadence-frontend  |
| CADENCE_WEB_PORT          | HTTP port to serve on                         | 8088              |
| CADENCE_EXTERNAL_SCRIPTS     | Addtional JavaScript tags to serve in the UI  |                |
| ENABLE_AUTH          | Enable auth feature                                | false             |
| AUTH_TYPE          | concurrently supports ADMIN_JWT                      | ''                |
| AUTH_ADMIN_JWT_PRIVATE_KEY          | JWT signing private key for ADMIN_JWT type  | ''        |

### Running locally

`cadence-web` requires node `v10.22.1` or greater to be able to run correctly. `cadence-web` uses all the standard [npm scripts](https://docs.npmjs.com/misc/scripts) to install dependencies, run the
server, and run tests. Additionally to run locally with webpack hot reloading and other conveniences, use

```
npm run dev
```

For development and contributing to `cadence-web`, please see the [contributing guide](https://github.com/uber/cadence-web/blob/master/CONTRIBUTING.md).

You may also use docker by pulling [ubercadence/web](https://hub.docker.com/r/ubercadence/web/). It is also included in the Cadence server's [local docker setup](https://github.com/uber/cadence/tree/master/docker).

### API

If you need to extend `cadence-web` to add middleware to the server, you can install `cadence-web` as a dependecy, and it will export the [Koa](http://koajs.com/) web server that has not yet been started or configured. It includes an additional `init` function that will then compose the built-in middleware. This gives you an option to add middleware before or after you call `init` so it will add the middleware at the beginning or the end of the chain, respectively.

#### `init(options)`

All options are optional.

`useWebpack`: If `true`, starts webpack and adds the middleware, otherwise if `false`, it assumes the UI bundle was already built and serves it statically. Defaults to `process.env.NODE_ENV === 'production'`.

`logErrors`: If `true`, thrown errors are logged to `console.error`. Defaults to `true`.

For example, here is how you would add a request count metric using `uber-statsd-client`:

```javascript
var app = require('cadence-web')
var createStatsd = require('uber-statsd-client')
var sdc = createStatsd({
    host: 'statsd.example.com'
})

app.use(async function(ctx, next) {
  sdc.increment('http.request')
  await next()
})
.init()
.listen(7000)
```


The [webpack](https://webpack.js.org/) configuration is also exported as `webpackConfig`, and can be modified before calling `init()`.

### Licence

MIT License, please see [LICENSE](https://github.com/uber/cadence-web/blob/master/LICENSE) for details.

[cadence]: https://github.com/uber/cadence
