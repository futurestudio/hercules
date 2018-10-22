'use strict'

const Ora = require('ora')
const Execa = require('execa')
const BaseCommand = require('./base')

class Sleep extends BaseCommand {
  static get signature () {
    return 'sleep'
  }

  static get description () {
    return 'Suspend your hercules box'
  }

  async handle () {
    await this.run(async () => {
      const spinner = Ora('Checking box status').start()

      if (await this.notCreated()) {
        spinner.stop()
        return this.warn('\nNo box existing. Stopping here.\n')
      }

      spinner.text = 'Suspending the box'
      await Execa('vagrant', ['suspend'], { cwd: this.herculesDir() })

      spinner.succeed('Box suspended. Let it sleep. Sshhh')
    })
  }
}

module.exports = Sleep
