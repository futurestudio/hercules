'use strict'

const Os = require('os')
const Ora = require('ora')
const Path = require('path')
const Execa = require('execa')
const { Command } = require('@adonisjs/ace')

const UserHomeDir = Os.homedir()
const HometownDir = Path.resolve(UserHomeDir, 'Hometown')

class Restart extends Command {
  static get signature () {
    return 'restart'
  }

  static get description () {
    return 'Restart your hometown box'
  }

  async handle () {
    try {
      await this.ensureDir(HometownDir)

      const spinner = Ora('Restarting the box').start()

      await Execa('vagrant', ['reload'], { cwd: HometownDir })

      spinner.succeed('Box restarted')
    } catch (err) {
      // catch any error and print the error message
      console.log(`\n❗️ Error: ${this.chalk.red(err.message || err.stderr)}`)
      // exit the process to stop everything
      process.exit(1)
    }
  }
}

module.exports = Restart
