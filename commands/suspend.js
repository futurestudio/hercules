'use strict'

const Path = require('path')
const Sleep = require(Path.resolve(__dirname, 'sleep'))

class Suspend extends Sleep {
  static get signature () {
    return 'suspend'
  }

  static get description () {
    return 'Alias command for "sleep"'
  }
}

module.exports = Suspend
