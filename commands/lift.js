'use strict'

const Os = require('os')
const Ora = require('ora')
const Path = require('path')
const Execa = require('execa')
const { Command } = require('@adonisjs/ace')

const UserHomeDir = Os.homedir()
const HometownDir = Path.resolve(UserHomeDir, 'Hometown')
const Vagrantfile = Path.resolve(__dirname, '..', 'Vagrantfile')

class Lift extends Command {
  static get signature () {
    return 'lift'
  }

  static get description () {
    return 'Start your hometown box'
  }

  async handle () {
    // ensure "Hometown" folder in user home dir
    await this.ensureDir(HometownDir)

    const initialized = await this.initialized()

    // copy Vagrantfile and scripts to "Hometown" folder
    if (!initialized) {
      await this.copy(Vagrantfile, Path.resolve(HometownDir, 'Vagrantfile'))
      await this.copy(Path.resolve(__dirname, '..', 'scripts'), Path.resolve(HometownDir, 'scripts'))

      this.info('No box existent. Lifting a new one!\n')

      // lift hometown VM
      const result = Execa('vagrant', ['up'], { cwd: HometownDir })
      result.stdout.pipe(process.stdout)
      result.stderr.pipe(process.stderr)

      return result
    }

    const spinner = Ora('Lifting your box').start()

    await Execa('vagrant', ['up'], { cwd: HometownDir })

    spinner.succeed('Your box is ready to use')
  }

  async initialized () {
    const file = Path.resolve(HometownDir, 'Vagrantfile')
    return this.pathExists(file)
  }
}

module.exports = Lift
