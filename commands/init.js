'use strict'

const Path = require('path')
const Yaml = require('js-yaml')
const BaseCommand = require('./base')
const { forEachSeries } = require('p-iteration')

class Init extends BaseCommand {
  static get signature () {
    return 'init'
  }

  static get description () {
    return 'Initialize your hercules box'
  }

  async handle () {
    try {
      this.info('Preparing hercules on your machine at "~/hercules"\n')

      if (!await this.initialized()) {
        return this.prepareHercules()
      }

      const proceed = await this.confirm('Found existing hercules environment. Override?', { default: false })

      if (!proceed) {
        this.info('\nStopping here.')
        return
      }

      await this.prepareHercules()
    } catch (error) {
      this.prettyPrintError(error)
      process.exit(1)
    }
  }

  async prepareHercules () {
    await this.copyVagrantfile()
    await this.copyScripts()
    await this.copyConfig()

    this.success('\nAll done. Start your box with "hercules up".')
  }

  async copyVagrantfile () {
    const target = Path.resolve(this.herculesDir(), 'Vagrantfile')
    await this.copy(this.vagrantfile(), target)
  }

  async copyScripts () {
    const source = Path.resolve(__dirname, '..', 'scripts')
    const target = Path.resolve(this.herculesDir(), 'scripts')
    await this.copy(source, target)
  }

  async copyConfig () {
    const source = Path.resolve(__dirname, '..', this.configFile())
    const target = Path.resolve(this.herculesDir(), this.configFile())
    await this.copy(source, target)
    await this.updateconfig(target)
  }

  async updateconfig (path) {
    const content = await this.readFile(path, 'utf8')
    const yaml = Yaml.safeLoad(content)

    const services = Object.keys(yaml.services)

    await forEachSeries(services, async service => {
      yaml[service] = await this.confirm(`Install ${service}`)
    })

    delete yaml.services
    await this.writeFile(path, Yaml.safeDump(yaml))
  }
}

module.exports = Init
