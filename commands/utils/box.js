'use strict'

const Os = require('os')
const Path = require('path')
const Execa = require('execa')

const UserHomeDir = Os.homedir()
const HometownDir = Path.resolve(UserHomeDir, 'Hometown')

class Box {
  async status() {
    try {
      const result = await Execa('vagrant', ['status'], { cwd: HometownDir })
      return result
    } catch (err) {
      return err
    }
  }

  async isRunning() {
    const { stdout = '' } = await this.status()
    return stdout.includes('running')
  }

  async isSaved() {
    const { stdout = '' } = await this.status()
    return stdout.includes('saved')
  }

  async notCreated() {
    const { stdout = '', stderr = '' } = await this.status()
    return stdout.includes('not created') || stderr.includes('to create a new Vagrant')
  }

  async isCreated() {
    const notCreated = await this.notCreated()
    return !notCreated
  }
}

module.exports = new Box()
