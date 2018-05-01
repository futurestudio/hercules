'use strict'

const Os = require('os')
const Ora = require('ora')
const Path = require('path')
const { Command } = require('@adonisjs/ace')
const Box = require(Path.resolve(__dirname, 'utils', 'box'))

const UserHomeDir = Os.homedir()
const HometownDir = Path.resolve(UserHomeDir, 'Hometown')

class Status extends Command {
  static get signature() {
    return 'status'
  }

  static get description() {
    return 'Status of your hometown box'
  }

  async handle() {
    try {
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
    } catch (err) {
      // catch any error and print the error message
      console.log(`\n❗️ Error: ${this.chalk.red(err.message || err.stderr)}`)
      // exit the process to stop everything
      process.exit(1)
    }
  }
}

module.exports = Status
