'use strict'

const Ora = require('ora')
const Path = require('path')
const { Command } = require('@adonisjs/ace')
const Box = require(Path.resolve(__dirname, 'utils', 'box'))

class Status extends Command {
  static get signature () {
    return 'status'
  }

  static get description () {
    return 'Status of your hometown box'
  }

  async handle () {
    const spinner = Ora('Fetching status').start()

    if (await Box.isRunning()) {
      spinner.stop()
      return this.success('\nRunning\n')
    }

    if (await Box.isSaved()) {
      spinner.stop()
      return this.info('\nSleeping\n')
    }

    if (await Box.notCreated()) {
      spinner.stop()
      return this.warn('\nNot created\n')
    }
  }
}

module.exports = Status
