import app from './server/index.js';

const port = Number(process.env.CADENCE_WEB_PORT) || 8088;
const production = process.env.NODE_ENV === 'production';

app.init().listen(port)

console.log('cadence-web up and listening on port ' + port)
if (!production) {
  console.log('webpack is compiling...')
}