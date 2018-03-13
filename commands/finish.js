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
  }
}

module.exports = Finish
