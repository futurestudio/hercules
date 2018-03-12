'use strict'

const Os = require('os')
const Path = require('path')
const Execa = require('execa')
const { Command } = require('@adonisjs/ace')

const UserHomeDir = Os.homedir()
const HometownDir = Path.resolve(UserHomeDir, 'Hometown')

class Finish extends Command {
  static get signature () {
    return 'finish'
  }

  static get description () {
    return 'Delete your existing hometown box'
  }

  async handle () {
    const result = Execa('vagrant destroy', { cwd: HometownDir, shell: true, stdio: 'inherit' })

    // result.stdin.pipe(process.stdin)
    result.stdout.pipe(process.stdout)
    result.stderr.pipe(process.stderr)
  }
}

module.exports = Finish
