#!/usr/bin/env node

'use strict';

const makeSureThat = require('assert');

// this function allows main modules to be tested
const run = (filename, init, ...args) => {
  makeSureThat(init instanceof Function,
    `Expecting second argument as a Function but received ${typeof init}`);

  if (process.argv[1] === filename) {
    return init(...args);
  }
};

module.exports = { run };
