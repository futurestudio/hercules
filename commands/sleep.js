'use strict'

const Os = require('os')
const Ora = require('ora')
const Path = require('path')
const Execa = require('execa')
const { Command } = require('@adonisjs/ace')

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
      const spinner = Ora('Suspending your box').start()

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
