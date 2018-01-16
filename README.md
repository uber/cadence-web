# Cadence Web UI

[![Build Status](https://travis-ci.org/uber/cadence-web.svg?branch=master)](https://travis-ci.org/uber/cadence-web)

Cadence is a distributed, scalable, durable, and highly available orchestration engine we developed at Uber Engineering to execute asynchronous long-running business logic in a scalable and resilient way.

This web UI is used to view workflows from [Cadence][cadence], see what's running, and explore and debug workflow executions.

![Demo Usage](https://s3-us-west-2.amazonaws.com/uber-common-public/svc-cadence-web/cadence-web-demo.gif)

## Getting Started

### Configuration

Set these environment variables if you need to change their defaults

| Variable                  | Description                                   | Default           |
| ------------------------- | --------------------------------------------- | ----------------- |
| CADENCE_TCHANNEL_PEERS    | Comma-delmited list of tchannel peers         | 127.0.0.1:7933    |
| CADENCE_TCHANNEL_SERVICE  | Name of the cadence tchannel service to call  | cadence-frontend  |
| CADENCE_WEB_PORT          | HTTP port to serve on                         | 8088              |


### Developing locally

`cadence-web` uses all the standard [npm scripts](https://docs.npmjs.com/misc/scripts) to install dependencies, run the server, and run tests. Additionally to develop locally with webpack hot reloading and other conveniences, use

```
npm run dev
```

### Licence

MIT License, please see [LICENSE](https://github.com/uber/cadence-web/blob/master/LICENSE) for details.

[cadence]: https://github.com/uber/cadence