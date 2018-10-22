'use strict'

const Ora = require('ora')
const BaseCommand = require('./base')

class Status extends BaseCommand {
  static get signature () {
    return 'status'
  }

  static get description () {
    return 'Status of your hercules box'
  }

  async handle () {
    await this.run(async () => {
      const spinner = Ora('Fetching status').start()
      const status = await this.status()

      if (await this.isRunning(status)) {
        spinner.stop()
        return this.success('\nRunning\n')
      }

      if (await this.isSleeping(status)) {
        spinner.stop()
        return this.info('\nSleeping\n')
      }

      if (await this.notCreated(status)) {
        spinner.stop()
        return this.warn('\nNot created\n')
      }

      spinner.stop()
      console.log(status.stdout)
    })
  }
}

module.exports = Status
