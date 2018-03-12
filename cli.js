#!/usr/bin/env node
'use strict'

const Ace = require('@adonisjs/ace')

Ace.addCommand(require('./commands/lift'))
Ace.addCommand(require('./commands/sleep'))

// Boot ace to execute commands
Ace.wireUpWithCommander()
Ace.invoke()
