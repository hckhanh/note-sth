'use strict'

const { FACEBOOK_APP_ID, APP_URL, APP_TITLE, APP_DESCRIPTION, APP_IMAGE } = process.env

let APP_CSS = '/index.css'
let APP_JS = '/index.js'
if (process.env.NODE_ENV === 'production') {
  const assetsManifest = require('../../client/dist/manifest.json')
  APP_CSS = assetsManifest['/index.css']
  APP_JS = assetsManifest['/index.js']
}

module.exports = res => {
  res.render('index', {
    FACEBOOK_APP_ID,
    APP_URL,
    APP_TITLE,
    APP_DESCRIPTION,
    APP_IMAGE,
    APP_CSS,
    APP_JS
  })
}
