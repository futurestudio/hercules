'use strict'

const Os = require('os')
const Ora = require('ora')
const Path = require('path')
const Execa = require('execa')
const { Command } = require('@adonisjs/ace')
const Box = require(Path.resolve(__dirname, 'utils', 'box'))

const UserHomeDir = Os.homedir()
const HometownDir = Path.resolve(UserHomeDir, 'Hometown')

class Destroy extends Command {
  static get signature () {
    return 'destroy'
  }

  static get description () {
    return 'Delete your existing hometown box'
  }

  async handle () {
    try {
      const spinner = Ora('Checking box status').start()

      if (await Box.notCreated()) {
        spinner.stop()
        return this.warn('\nNo box to delete. Stopping here.\n')
      }

      const destroy = await this.confirm('Delete the hometown box?', { default: false })

      if (destroy) {
        spinner.text('Deleting the box')

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

module.exports = Destroy
