'use strict';
const neatCsv = require('neat-csv');
const pify = require('pify');
const Promise = require('pinkie-promise');
const redent = require('redent');
const trimNewlines = require('trim-newlines');

module.exports = (str, opts) => {
	opts = opts || {};
	opts.attributes = opts.attributes || {};

	if (typeof str !== 'string') {
		return Promise.reject(new TypeError('Expected a string'));
	}

	function getAttributes() {
		const keys = Object.keys(opts.attributes);
		return keys.map(el => `${el}="${String(opts.attributes[el])}"`).join(' ').trim();
	}

	return pify(neatCsv, Promise)(str, opts).then(data => {
		return data.map(el => {
			const attrs = getAttributes() ? ` ${getAttributes()}` : '';
			const keys = Object.keys(el);
			const tags = keys.map(key => {
				const tag = key === 'to' ? `${key}${attrs}` : key;

				if (!el[key]) {
					return null;
				}

				if (key === 'from' && opts.strict) {
					el[key] = `^${el[key].trim()}$`;
				}

				return `    <${tag}>${el[key].trim()}</${key}>`;
			}).filter(Boolean).join('\n');

			return redent(trimNewlines(`<rule>\n${tags}\n</rule>`));
		});
	});
};
