'use strict';

const { strictEqual } = require('node:assert/strict');
const { resolveGuildTemplateCode } = require('../src/index.js');

strictEqual(resolveGuildTemplateCode('https://guilderia.new/abc'), 'abc');
