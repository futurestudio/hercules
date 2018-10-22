'use strict'

const Ora = require('ora')
const Execa = require('execa')
const BaseCommand = require('./base')

class Up extends BaseCommand {
  static get signature () {
    return 'up'
  }

  static get description () {
    return 'Start your hercules box'
  }

  async handle () {
    await this.run(async () => {
      const spinner = Ora('Checking box status').start()
      const initialized = await this.boxCreated()

      if (!initialized) {
        spinner.stop()
        this.info('No box existent. Lifting a new one! This takes some minutes.\n')

        await this.create()
        return
      }

      if (await this.isRunning()) {
        spinner.stop()
        return this.info('Hercules box is already running')
      }

      spinner.text = 'Bringing your box back from sleep'

      await Execa('vagrant', ['up'], { cwd: this.herculesDir() })

      spinner.succeed('Ready to use')
    })
  }

  async boxCreated () {
    const [exists, created] = await Promise.all([this.initialized(), this.isCreated()])

    return exists && created
  }

  async create () {
    const result = Execa('vagrant', ['up'], { cwd: this.herculesDir() })
    result.stdout.pipe(process.stdout)
    result.stderr.pipe(process.stderr)
  }
}

module.exports = Up
