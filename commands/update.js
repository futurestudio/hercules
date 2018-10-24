'use strict'

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
      await this.update()
    })
  }

  async update () {
    this.info('Starting the update\n')
    await this.copyVagrantfile()
    await this.copyScripts()

    const update = Execa('vagrant', ['up', '--provision'], { cwd: this.herculesDir() })
    update.stdout.pipe(process.stdout)
    update.stderr.pipe(process.stderr)
  }
}

module.exports = Update
