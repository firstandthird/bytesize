'use strict';
const bytesize = require('./index.js');
const async = require('async');
const argv = require('yargs')
.usage('Usage: $0 [filename]')
.option('stringsize', {
  alias: 's',
  describe: 'get the bytesize of the input string itself, instead of interpreting it as a file path',
  default: false
})
.option('filesize', {
  alias: 'f',
  describe: 'show the raw file size',
  default: true,
  type: 'boolean'
})
.option('gzipsize', {
  alias: 'g',
  describe: 'show the file size after gzip compression',
  default: false,
  type: 'boolean'
})
.option('pretty', {
  alias: 'p',
  describe: 'print the results in a human-readable format',
  default: false,
  type: 'boolean'
})
.help()
.argv;

if (argv.stringsize) {
  return console.log('String size is %s', bytesize.stringSize(argv._.toString(), argv.pretty));
}

argv._.forEach((fileName) => {
  async.autoInject({
    gzipSize: (done) => {
      if (argv.gzipsize) {
        return bytesize.gzipSize(fileName, argv.pretty, done);
      }
      done();
    },
    fileSize: (done) => {
      if (argv.filesize) {
        return bytesize.fileSize(fileName, argv.pretty, done, false);
      }
      done();
    }
  }, (err, results) => {
    if (err) {
      return console.log(err)
    }
    console.log('%s:', fileName);
    if (argv.filesize) {
      console.log('    file size: %s', results.fileSize);
    }
    if (argv.gzipsize) {
      console.log('    gzip size: %s', results.gzipSize);
    }
  })
});
