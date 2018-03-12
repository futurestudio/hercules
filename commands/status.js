'use strict'

const Os = require('os')
const Ora = require('ora')
const Path = require('path')
const Execa = require('execa')
const { Command } = require('@adonisjs/ace')

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
    const spinner = Ora('Fetching status').start()

    // lift hometown VM
    const result = await Execa('vagrant', ['status'], { cwd: HometownDir })
    spinner.stop()

    if (this.isRunning(result)) {
      return this.success('\nRunning\n')
    }

    if (this.isSaved(result)) {
      return this.info('\nSleeping\n')
    }

    if (this.notCreated(result)) {
      return this.warn('\nNot created\n')
    }

    this.info(result.stdout)
  }

  isRunning (result) {
    return result.stdout && result.stdout.includes('running')
  }

  isSaved (result) {
    return result.stdout && result.stdout.includes('saved')
  }

  notCreated (result) {
    return result.stdout && result.stdout.includes('not created')
  }
}

module.exports = Status
