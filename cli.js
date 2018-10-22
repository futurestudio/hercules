#!/usr/bin/env node
'use strict'

const Path = require('path')
const Ace = require('@adonisjs/ace')
const Commands = require('./commands')
const UpdateNotifier = require('update-notifier')
const Pkg = require(Path.resolve(__dirname, 'package.json'))

UpdateNotifier({ pkg: Pkg }).notify()

Object.keys(Commands).forEach(Command => Ace.addCommand(Commands[Command]))

// Boot ace to execute commands
Ace.wireUpWithCommander()
Ace.invoke()
