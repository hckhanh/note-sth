'use strict'

const renderIndex = require('../util/renderIndex')

module.exports = app => {
  app.get('/', (req, res) => {
    renderIndex(res)
  })
}
