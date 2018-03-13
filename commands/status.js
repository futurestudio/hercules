'use strict'

const Os = require('os')
const Ora = require('ora')
const Path = require('path')
const { Command } = require('@adonisjs/ace')
const Box = require(Path.resolve(__dirname, 'utils', 'box'))

const UserHomeDir = Os.homedir()
const HometownDir = Path.resolve(UserHomeDir, 'Hometown')

class Status extends Command {
  static get signature () {
    return 'status'
  }

  static get description () {
    return 'Status of your hometown box'
  }

  async handle () {
    await this.ensureDir(HometownDir)

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

    spinner.stop()

    const status = await Box.status()
    console.log(status.stdout)
    console.log(status.stderr)
  }
}

module.exports = Status
