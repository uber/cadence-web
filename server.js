var app = require('./server/index'),
    production = process.env.NODE_ENV === 'production'

app.init().listen(port)

console.log('cadence-web up and listening on port ' + port)
if (!production) {
  console.log('webpack is compiling...')
}