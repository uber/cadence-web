const app = require('./server/index');
const { basePath } = require('./server/constants');
const port = Number(process.env.CADENCE_WEB_PORT) || 8088;
const production = process.env.NODE_ENV === 'production';

app.init().listen(port)

console.log(`cadence-web up and listening on port ${port} and path ${basePath}`)
if (!production) {
  console.log('webpack is compiling...')
}
