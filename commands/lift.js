'use strict'

const Os = require('os')
const Path = require('path')
const Execa = require('execa')
const { Command } = require('@adonisjs/ace')

const UserHomeDir = Os.homedir()
const HometownDir = Path.resolve(UserHomeDir, 'Hometown')
const Vagrantfile = Path.resolve(__dirname, '..', 'Vagrantfile')

class Lift extends Command {
  static get signature() {
    return 'lift'
  }

  static get description() {
    return 'Start your hometown box'
  }

  async handle() {
    // ensure "Hometown" folder in user home dir
    await this.ensureDir(HometownDir)

    // copy Vagrantfile to "Hometown" folder
    await this.copy(Vagrantfile, Path.resolve(HometownDir, 'Vagrantfile'))
    await this.copy(Path.resolve(__dirname, '..', 'scripts'), Path.resolve(HometownDir, 'scripts'))

    // lift hometown VM
    const result = Execa('vagrant', ['up'], { cwd: HometownDir })
    result.stdout.pipe(process.stdout)
    result.stderr.pipe(process.stderr)
  }
}

module.exports = Lift
