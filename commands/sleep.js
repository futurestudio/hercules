'use strict'

const Os = require('os')
const Ora = require('ora')
const Path = require('path')
const Execa = require('execa')
const { Command } = require('@adonisjs/ace')

const UserHomeDir = Os.homedir()
const HometownDir = Path.resolve(UserHomeDir, 'Hometown')

class Sleep extends Command {
  static get signature () {
    return 'sleep'
  }

  static get description () {
    return 'Suspend your hometown box'
  }

  async handle () {
    const spinner = Ora('Suspending your box').start()

    await Execa('vagrant', ['suspend'], { cwd: HometownDir })

    spinner.succeed('Let it sleep. Sshhh')
  }
}

module.exports = Sleep
