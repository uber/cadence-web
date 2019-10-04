var app = require('./server/index'),
    port = Number(process.env.CADENCE_WEB_PORT) || 8088,
    path = process.env.CADENCE_WEB_ROOT || '/'
    production = process.env.NODE_ENV === 'production'

app.init().listen(port)

console.log('cadence-web up and listening on port ' + port + ' and path ' + path)
if (!production) {
  console.log('webpack is compiling...')
}
