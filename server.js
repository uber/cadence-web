const mount = require('koa-mount');
const Koa = require('koa');
const cadenceWeb = require('./server/index'),
  port = Number(process.env.CADENCE_WEB_PORT) || 8088,
  production = process.env.NODE_ENV === 'production';

const app = new Koa();
const appPrefixPath = process.env.PREFIX_PATH || '/'

app.use(mount(appPrefixPath, cadenceWeb.init()));
app.listen(port);

console.log('cadence-web up and listening on port ' + port);

if (!production) {
  console.log('webpack is compiling...');
}
