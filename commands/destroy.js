'use strict'

const Ora = require('ora')
const Execa = require('execa')
const BaseCommand = require('./base')

class Destroy extends BaseCommand {
  static get signature () {
    return 'destroy'
  }

  static get description () {
    return 'Delete your existing hercules box'
  }

  async handle () {
    await this.run(async () => {
      const spinner = Ora('Checking box status').start()

      if (await this.notCreated()) {
        spinner.stop()
        await this.deleteHerculesDir()

        return this.warn('\nNo box to delete. Stopping here.\n')
      }

      spinner.stop()

      const destroy = await this.confirm('Delete the hercules box?', { default: false })

      if (destroy) {
        spinner.start()
        spinner.text = 'Deleting the box'

        const result = await Execa('vagrant destroy --force', {
          cwd: this.herculesDir(),
          shell: true
        })

        if (result.stderr) {
          this.error(result.stderr)
          spinner.stop()
          return
        }

        await this.deleteHerculesDir()

        spinner.succeed('Box deleted')
      }
    })
  }

  async deleteHerculesDir () {
    return this.removeDir(this.herculesDir())
  }
}

module.exports = Destroy
