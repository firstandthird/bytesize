'use strict';
const humanize = require('humanize');
const zlib = require('zlib');
// const Gzip = zlib.createGzip();
const fs = require('fs');

const prettyBytes = (bytes) => {
  return humanize.filesize(bytes);
};

const stringSize = (str, pretty) => {
  const bytes = Buffer.byteLength(str);
  return (pretty) ? prettyBytes(bytes) : bytes;
};

const fileSize = (file, pretty, callback, gzip) => {
  if (typeof pretty === 'function') {
    callback = pretty;
    pretty = false;
  }
  fs.readFile(file, 'utf8', (err, fileData) => {
    if (err) {
      return console.log(err);
    }
    if (gzip) {
      zlib.gzip(fileData, (gzipErr, buf) => {
        let bytes = buf.length;
        bytes = (pretty) ? prettyBytes(bytes) : bytes;
        callback(gzipErr, bytes);
      });
    } else {
      return callback(err, stringSize(fileData, pretty));
    }
  });
};

const gzipSize = (file, pretty, callback) => {
  fileSize(file, pretty, callback, true);
};

module.exports.stringSize = stringSize;
module.exports.fileSize = fileSize;
module.exports.gzipSize = gzipSize;
