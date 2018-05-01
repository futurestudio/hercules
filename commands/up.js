'use strict'

const Path = require('path')
const Lift = require(Path.resolve(__dirname, 'lift'))

class Up extends Lift {
  static get signature() {
    return 'up'
  }

  static get description() {
    return 'Alias command for "lift"'
  }
}

module.exports = Up
