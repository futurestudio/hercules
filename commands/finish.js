'use strict'

const Os = require('os')
const Ora = require('ora')
const Path = require('path')
const Execa = require('execa')
const { Command } = require('@adonisjs/ace')

const UserHomeDir = Os.homedir()
const HometownDir = Path.resolve(UserHomeDir, 'Hometown')

class Finish extends Command {
  static get signature () {
    return 'finish'
  }

  static get description () {
    return 'Delete your existing hometown box'
  }

  async handle () {
    try {
      const destroy = await this.confirm('Delete the hometown box?', { default: false })

      if (destroy) {
        const spinner = Ora('Deleting the box').start()

        const result = await Execa('vagrant destroy --force', { cwd: HometownDir, shell: true })

        if (result.stderr) {
          this.error(result.stderr)
          spinner.stop()
          return
        }

        spinner.succeed('Box deleted')
      }
    } catch (err) {
      // catch any error and print the error message
      console.log(`\n❗️ Error: ${this.chalk.red(err.message || err.stderr)}`)
      // exit the process to stop everything
      process.exit(1)
    }
  }
}

module.exports = Finish
