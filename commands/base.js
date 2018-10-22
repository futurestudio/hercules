'use strict'

const Os = require('os')
const Path = require('path')
const Execa = require('execa')
const { Command } = require('@adonisjs/ace')

class BaseCommand extends Command {
  /**
   * A wrapper method to run a given command
   * in a safe environment and also prints
   * pretty errors on failure.
   *
   * @param {Function} callback
   */
  async run (callback) {
    this.chalk.enabled = true

    try {
      await this.ensureInitialized()
      await callback()
    } catch (error) {
      this.prettyPrintError(error)
      process.exit(1)
    }
  }

  /**
   * Pretty print the error message.
   *
   * @param {Object} error
   */
  prettyPrintError (error) {
    console.log(`\n  ${this.chalk.bold.red('Error:')} ${this.chalk.red(error.message)}\n`)
  }

  async initialized () {
    return this.pathExists(this.herculesDir())
  }

  async ensureInitialized () {
    const installed = await this.initialized()

    if (!installed) {
      throw new Error('Oh no, Hercules is not initialized. Run "hercules init".')
    }
  }

  vagrantfile () {
    return Path.resolve(__dirname, '..', 'Vagrantfile')
  }

  configFile () {
    return 'hercules.yaml'
  }

  homedir () {
    return Os.homedir()
  }

  herculesDir () {
    return Path.resolve(this.homedir(), 'hercules')
  }

  async status () {
    try {
      const result = await Execa('vagrant', ['status'], { cwd: this.herculesDir() })
      return result
    } catch (err) {
      return err
    }
  }

  async isRunning (status) {
    const { stdout = '' } = status || await this.status()
    return stdout.includes('running')
  }

  async isSleeping (status) {
    const { stdout = '' } = status || await this.status()
    return stdout.includes('saved')
  }

  async notCreated (status) {
    const { stdout = '', stderr = '' } = status || await this.status()
    return stdout.includes('not created') || stderr.includes('to create a new Vagrant')
  }

  async isCreated () {
    const notCreated = await this.notCreated()
    return !notCreated
  }
}

module.exports = BaseCommand
