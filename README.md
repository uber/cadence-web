# Cadence Web UI

Cadence is a distributed, scalable, durable, and highly available orchestration engine we developed at Uber Engineering to execute asynchronous long-running business logic in a scalable and resilient way.

This web UI is used to visualize workflows from [Cadence][cadence].

## Getting Started

### Configuration

Set these environment variables if you need to change their defaults

| Variable                  | Description                                   | Default           |
| ------------------------- | --------------------------------------------- | ----------------- |
| CADENCE_TCHANNEL_PEERS    | Comma-delmited list of tchannel peers         | 127.0.0.1:7933    |
| CADENCE_TCHANNEL_SERVICE  | Name of the cadence tchannel service to call  | cadence-frontend  |
| UBER_PORT_HTTP            | HTTP port to serve on                         | 8088              |


### Staring locally

```
npm i
npm start
```

### Developing locally

```
npm i
npm run dev
```

[cadence]: https://github.com/uber/cadence