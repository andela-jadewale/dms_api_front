var spawn = require('child_process').spawn;

var child = spawn('mocha-phantomjs', [
  'http://localhost:9000/static/js/test/index.html',
  '--timeout', '25000',
  '--hooks', './js/test/phantom_hooks.js'
]);

child.on('close', function (code) {
  'use strict';
  console.log('Mocha process exited with code ' + code);
  if (code > 0) {
    process.exit(1);
  }
});