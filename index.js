const zlib = require('zlib');
const gzip = zlib.createGzip();
const fs = require('fs');
const prettyBytes = require('pretty-bytes');
const util = require('util');

const stringSize = (str, pretty) => {
  return Buffer.byteLength(str);
};

const fileSize = async(file, pretty, gzip) => {
  fileData = await util.promisify(fs.readFile)(file, 'utf8');
  let bytes;
  if (gzip) {
    const buf = await util.promisify(zlib.gzip)(fileData);
    bytes = buf.length;
  } else {
    bytes = stringSize(fileData);
  }
  return (pretty) ? prettyBytes(bytes) : bytes;
};

const gzipSize = async(file, pretty) => {
  return fileSize(file, pretty, true);
};

module.exports.stringSize = stringSize;
module.exports.fileSize = fileSize;
module.exports.gzipSize = gzipSize;
