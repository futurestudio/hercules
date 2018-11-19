#!/usr/bin/env node
'use strict'

const Ace = require('@adonisjs/ace')
const Pkg = require('./package.json')
const Commands = require('./commands')
const UpdateNotifier = require('update-notifier')

UpdateNotifier({ pkg: Pkg }).notify({ isGlobal: true })

Object.keys(Commands).forEach(Command => Ace.addCommand(Commands[Command]))

// Boot ace to execute commands
Ace.wireUpWithCommander()
Ace.invoke(Pkg)
