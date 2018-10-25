'use strict'

const Path = require('path')
const Yaml = require('js-yaml')
const BaseCommand = require('./base')
const { forEachSeries } = require('p-iteration')

class Init extends BaseCommand {
  static get signature () {
    return `
    init
    { -f, --force: Override an existing environment }
    `
  }

  static get description () {
    return 'Initialize your hercules box'
  }

  async handle (_, { force }) {
    try {
      this.info('Preparing hercules on your machine at "~/hercules"\n')

      if (await this.notInitialized()) {
        await this.prepareHercules()
        this.success('\nHercules configuration created. Start your box with "hercules up".')
        return
      }

      if (force) {
        return this.prepareHercules()
      }

      const proceed = await this.confirm('Found existing hercules environment. Override?', { default: false })

      if (!proceed) {
        this.info('\nStopping here.')
        return
      }

      await this.prepareHercules()
      this.success('\nHercules configuration created. Update your box with "hercules update".')
    } catch (error) {
      this.prettyPrintError(error)
      process.exit(1)
    }
  }

  async prepareHercules () {
    await this.copyVagrantfile()
    await this.copyScripts()
    await this.copyConfig()
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
