#!/usr/bin/env node

const deployh5 = require('../lib/index');

function main() {
  deployh5.clean();
}

if (require.main === module) {
  main();
}

module.exports = main;
