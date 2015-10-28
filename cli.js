#!/usr/bin/env node
'use strict';
const fs = require('fs');
const getStdin = require('get-stdin');
const meow = require('meow');
const pify = require('pify');
const csvToRewrite = require('./');

const cli = meow(`
	Example
	  $ csv-to-rewrite --out unicorn.xml unicorn.csv
	  $ cat unicorn.csv | csv-to-rewrite > unicorn.xml
`);

if (!cli.input.length && process.stdin.isTTY) {
	console.error('Expected a file');
	process.exit(1);
}

if (!cli.flags.out && process.stdin.isTTY) {
	console.error('Expected a output file');
	process.exit(1);
}

if (cli.input.length) {
	pify(fs.readFile)(cli.input[0], 'utf8').then(data => {
		csvToRewrite(data).then(str => pify(fs.writeFile)(cli.flags.out, str.join('\n')));
	});
} else {
	getStdin().then(str => csvToRewrite(str).then(str => process.stdout.write(str.join('\n'))));
}
