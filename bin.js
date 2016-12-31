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
.option('hidefile', {
  alias: 'f',
  describe: 'hide the raw file size',
  default: false,
  type: 'boolean'
})
.option('hidegzip', {
  alias: 'g',
  describe: 'hide the file size after gzip compression',
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
      if (!argv.hidegzip) {
        return bytesize.gzipSize(fileName, argv.pretty, done);
      }
      done();
    },
    fileSize: (done) => {
      if (!argv.hidefile) {
        return bytesize.fileSize(fileName, argv.pretty, done, false);
      }
      done();
    }
  }, (err, results) => {
    if (err) {
      return console.log(err)
    }
    console.log('%s:', fileName);
    if (!argv.hidefile) {
      console.log('    file size: %s', results.fileSize);
    }
    if (!argv.hidegzip) {
      console.log('    gzip size: %s', results.gzipSize);
    }
  })
});
