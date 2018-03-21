#!/usr/bin/env node
'use strict'

const Path = require('path')
const Ace = require('@adonisjs/ace')
const UpdateNotifier = require('update-notifier')
const Pkg = require(Path.resolve(__dirname, 'package.json'))

UpdateNotifier({ pkg: Pkg }).notify()

Ace.addCommand(require('./commands/up'))
Ace.addCommand(require('./commands/lift'))
Ace.addCommand(require('./commands/sleep'))
Ace.addCommand(require('./commands/suspend'))
Ace.addCommand(require('./commands/destroy'))
Ace.addCommand(require('./commands/status'))

// Boot ace to execute commands
Ace.wireUpWithCommander()
Ace.invoke()
