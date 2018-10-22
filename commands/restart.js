'use strict'

const Ora = require('ora')
const Execa = require('execa')
const BaseCommand = require('./base')

class Restart extends BaseCommand {
  static get signature () {
    return 'restart'
  }

  static get description () {
    return 'Restart your hercules box'
  }

  async handle () {
    await this.run(async () => {
      const spinner = Ora('Restarting the box').start()

      await Execa('vagrant', ['reload'], { cwd: this.herculesDir() })

      spinner.succeed('Box restarted')
    })
  }
}

module.exports = Restart
