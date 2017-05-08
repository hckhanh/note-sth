'use strict'

const Ably = require('ably')
const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY })

module.exports = function(Account) {
  /**
   * Get authentication token from socket service (realtime)
   * @param {string} id Account id
   * @param {Function(Error, object)} callback
   */
  Account.getSocketToken = function(id, callback) {
    ably.auth.requestToken({ clientId: id }, function(error, socketToken) {
      if (error) return callback(error)
      callback(null, socketToken)
    })
  }
}
