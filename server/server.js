'use strict'

const { resolve } = require('path')
const loopback = require('loopback')
const boot = require('loopback-boot')
const pug = require('pug')

const app = module.exports = loopback()

// setup view engine
app.set('views', resolve(__dirname, 'view'))
app.set('view engine', 'pug')

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started')
    const baseUrl = app.get('url').replace(/\/$/, '')
    console.log('Web server listening at: %s', baseUrl)
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath)
    }
  })
}

// Bootstrap the application, configure models, data sources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start()
})
