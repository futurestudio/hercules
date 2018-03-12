#!/usr/bin/env node
'use strict'

const Ace = require('@adonisjs/ace')

Ace.addCommand(require('./commands/up'))
Ace.addCommand(require('./commands/lift'))
Ace.addCommand(require('./commands/sleep'))
Ace.addCommand(require('./commands/finish'))
Ace.addCommand(require('./commands/status'))

// Boot ace to execute commands
Ace.wireUpWithCommander()
Ace.invoke()
