'use strict'

const Ora = require('ora')
const Execa = require('execa')
const BaseCommand = require('./base')

class SSH extends BaseCommand {
  static get signature () {
    return 'ssh'
  }

  static get description () {
    return 'SSH into your hercules box'
  }

  async handle () {
    await this.run(async () => {
      const spinner = Ora('Fetching box status').start()

      if (!await this.isRunning()) {
        spinner.stop()

        return this.warn('\nCannot SSH into the Hercules box. It’s not running.\n')
      }

      spinner.stop()
      this.info('Connecting the worlds. Ready in 1-2-3\n')

      await Execa('vagrant', ['ssh'], {
        stdin: 'inherit',
        stdout: 'inherit',
        cwd: this.herculesDir()
      })
    })
  }
}

module.exports = SSH
