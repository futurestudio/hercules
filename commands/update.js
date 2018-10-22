'use strict'

const Ora = require('ora')
const Execa = require('execa')
const BaseCommand = require('./base')

class Update extends BaseCommand {
  static get signature () {
    return 'update'
  }

  static get description () {
    return 'Update your hercules box to the newest version'
  }

  async handle () {
    await this.run(async () => {
      const spinner = Ora('Checking if your box is suspended').start()
      const sleeping = await this.isSleeping()

      if (!sleeping) {
        spinner.text('Box was running. Suspending it before moving on.')
        await this.suspendBox()
      }

      spinner.stop()

      await this.updateBox()
    })
  }

  async suspendBox () {
    await Execa('hercules', ['sleep'])
  }

  updateBox () {
    throw new Error('TODO: need to implement this')
  }
}

module.exports = Update
