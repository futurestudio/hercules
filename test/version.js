'use strict'

const Test = require('ava')
const Execa = require('execa')
const Pkg = require('./../package.json')

Test('Show the version', async (t) => {
  const { stdout } = await Execa('node', ['cli', '--version'])
  t.is(stdout, Pkg.version)
})
