#!/usr/bin/env node

require(require('path').join(__dirname, 'index.js'))

const { spawn } = require('child_process')

// console.log(process.argv.slice(2), process.env)
console.log(process.argv[2], '>>', process.argv.slice(3))

const p = spawn(process.argv[2], process.argv.slice(3), { cwd: process.cwd(), env: process.env })
p.stdout.on('data', d => console.log(d.toString()))
p.stderr.on('data', d => console.error(d.toString()))
