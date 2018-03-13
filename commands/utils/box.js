'use strict'

const Os = require('os')
const Path = require('path')
const Execa = require('execa')

const UserHomeDir = Os.homedir()
const HometownDir = Path.resolve(UserHomeDir, 'Hometown')

class Box {
  async status () {
    return Execa('vagrant', ['status'], { cwd: HometownDir })
  }

  async isRunning () {
    const result = await this.status()
    return result.stdout && result.stdout.includes('running')
  }

  async isSaved () {
    const result = await this.status()
    return result.stdout && result.stdout.includes('saved')
  }

  async notCreated () {
    const result = await this.status()
    return result.stdout && result.stdout.includes('not created')
  }
}

module.exports = new Box()
