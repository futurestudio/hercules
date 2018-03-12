'use strict'

const Os = require('os')
const Path = require('path')
const Execa = require('execa')
const { Command } = require('@adonisjs/ace')

const UserHomeDir = Os.homedir()
const HometownDir = Path.resolve(UserHomeDir, 'Hometown')
const Vagrantfile = Path.resolve(__dirname, '..', 'Vagrantfile')

class Sleep extends Command {
  static get signature() {
    return 'sleep'
  }

  static get description() {
    return 'Suspend your hometown box'
  }

  async handle() {
    // lift hometown VM
    const result = Execa('vagrant', ['suspend'], { cwd: HometownDir })
    result.stdout.pipe(process.stdout)
    result.stderr.pipe(process.stderr)
  }
}

module.exports = Sleep
