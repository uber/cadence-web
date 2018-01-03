if (module.hot) {
  module.hot.addStatusHandler(function(status) {
    if (status === 'apply') {
      location.reload()
    }
  })
}

require('mocha/mocha')
window.finalizeEach = require('mocha-finalize-each')

var mochaDiv = document.createElement('div')
mochaDiv.id = 'mocha'
document.body.appendChild(mochaDiv)
document.querySelector('[rel="stylesheet"]').href="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.4.2/mocha.css"
document.title = 'Cadence Tests'

var chai = window.chai = require('chai')
chai.should()
chai.use(require('chai-dom'))

require('nathanboktae-browser-test-utils')

mocha.setup({
  ui: 'bdd',
  globals: ['Scenario', 'testEl'],
  slow: 500
})

beforeEach(function() {
  localStorage.clear()
})

require('./scenario')

mocha.checkLeaks()

require('./intro.tests.js')

mocha.run()