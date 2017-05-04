'use strict'

const renderIndex = require('../util/renderIndex')

module.exports = function() {
  return function(error, req, res, next) {
    if (req.originalUrl.startsWith('/api')) {
      return next(error)
    }

    // Send index file when API is not found
    renderIndex(res)
  }
}
