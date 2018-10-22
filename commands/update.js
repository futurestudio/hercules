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
      await this.suspend()
      await this.update()
      await this.start()
    })
  }

  async suspend () {
    const spinner = Ora('Suspending the box').start()
    await Execa('hercules', ['sleep'])
    spinner.succeed('Box suspended.\n')
  }

  async start () {
    const spinner = Ora('Starting the box').start()
    await Execa('hercules', ['up'])
    spinner.succeed('Box started and ready to use.')
  }

  async update () {
    this.info('Starting the update\n')
    await this.copyVagrantfile()
    await this.copyScripts()

    // const update = Execa('vagrant', ['up', '--provision'], { cwd: this.herculesDir() })
    // update.stdout.pipe(process.stdout)
    // update.stderr.pipe(process.stderr)
  }
}

module.exports = Update
