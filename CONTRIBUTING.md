# Developing Cadence's Web UI

This doc is intended for contributors to `cadence-web`

**Note:** All contributors will be asked to sign [Uber Contributor License Agreement](http://t.uber.com/cla) during the PR process.

## Development Environment

Node.js. Check [package.json](https://github.com/uber/cadence-web/blob/master/package.json) for the current version required. We recommend using [nvm](https://github.com/creationix/nvm) to manage your versions.

You also need to run [cadence-server](https://github.com/uber/cadence) locally or have access to a cadence environment to talk to.

## Working with the source code

Follow [this great guide](https://gist.github.com/Chaser324/ce0505fbed06b947d962) on how to work with a GitHub fork and submit a pull request.

## Building

The standard node.js workflow is used here. Use Node version 10. Version 12 is unable to install the 
[farmhash](https://www.npmjs.com/package/farmhash) package.

```
npm i
npm run dev   # webpack hot reload environment
npm start     # for production
```

## Testing

Start up the webserver for testing via:

```
npm run test-server
```

The open `localhost:8090` in the browser of your choice, or use `npm test` to run it with [mocha-chrome](https://www.npmjs.com/package/mocha-chrome) from the command line. This runs the tests via Chrome in headless mode and shows the results in your terminal.
