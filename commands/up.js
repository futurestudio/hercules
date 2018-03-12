'use strict'

const Lift = require('./lift')

class Up extends Lift {
  static get signature () {
    return 'up'
  }

  static get description () {
    return 'Alias command for "lift"'
  }
}

module.exports = Up
