'use strict'

const Os = require('os')
const Ora = require('ora')
const Path = require('path')
const Execa = require('execa')
const { Command } = require('@adonisjs/ace')
const Box = require(Path.resolve(__dirname, 'utils', 'box'))

const UserHomeDir = Os.homedir()
const HometownDir = Path.resolve(UserHomeDir, 'Hometown')

class Sleep extends Command {
  static get signature () {
    return 'sleep'
  }

  static get description () {
    return 'Suspend your hometown box'
  }

  async handle () {
    try {
      const spinner = Ora('Checking box status').start()

      if (await Box.notCreated()) {
        spinner.stop()
        return this.warn('\nNo box existing. Stopping here.\n')
      }

      await Execa('vagrant', ['suspend'], { cwd: HometownDir })

      spinner.succeed('Let it sleep. Sshhh')
    } catch (err) {
      // catch any error and print the error message
      console.log(`\n❗️ Error: ${this.chalk.red(err.message || err.stderr)}`)
      // exit the process to stop everything
      process.exit(1)
    }
  }
}

module.exports = Sleep
