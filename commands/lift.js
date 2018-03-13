'use strict'

const Os = require('os')
const Ora = require('ora')
const Path = require('path')
const Execa = require('execa')
const { Command } = require('@adonisjs/ace')
const Box = require(Path.resolve(__dirname, 'utils', 'box'))

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

    const spinner = Ora('Checking box status').start()
    const initialized = await this.initialized()

    if (!initialized) {
      spinner.stop()
      this.info('No box existent. Lifting a new one! This takes some minutes.\n')

      await this.create()
      return
    }

    spinner.text('Bringing your box back from sleep')

    await Execa('vagrant', ['up'], { cwd: HometownDir })

    spinner.succeed('Ready to use')
  }

  async initialized () {
    const vagrantfile = Path.resolve(HometownDir, 'Vagrantfile')
    const [exists, created] = await Promise.all([this.pathExists(vagrantfile), Box.isCreated()])

    return exists && created
  }

  async create () {
    // copy Vagrantfile and scripts to "Hometown" folder
    this.copyVagrantfile()
    this.copyScripts()

    // lift hometown VM
    const result = Execa('vagrant', ['up'], { cwd: HometownDir })
    result.stdout.pipe(process.stdout)
    result.stderr.pipe(process.stderr)
  }

  async copyVagrantfile () {
    const target = Path.resolve(HometownDir, 'Vagrantfile')
    const exists = await this.pathExists(target)

    if (!exists) {
      await this.copy(Vagrantfile, target)
    }
  }

  async copyScripts () {
    const source = Path.resolve(__dirname, '..', 'scripts')
    const target = Path.resolve(HometownDir, 'scripts')
    const exists = await this.pathExists(target)

    if (!exists) {
      await this.copy(source, target)
    }
  }
}

module.exports = Lift
