const zlib = require('zlib');
const gzip = zlib.createGzip();
const fs = require('fs');
const prettyBytes = require('pretty-bytes');
const util = require('util');

const stringSize = (str, pretty) => {
  let bytes = Buffer.byteLength(str);
  return (pretty) ? prettyBytes(bytes) : bytes;
};

const fileSize = async(file, pretty, gzip) => {
  fileData = await util.promisify(fs.readFile)(file, 'utf8');
  if (gzip) {
    const buf = await util.promisify(zlib.gzip)(fileData);
    bytes = buf.length;
    bytes = (pretty) ? prettyBytes(bytes) : bytes;
    return bytes;
  }
  return stringSize(fileData, pretty);
};

const gzipSize = async(file, pretty) => {
  return fileSize(file, pretty, true);
};

module.exports.stringSize = stringSize;
module.exports.fileSize = fileSize;
module.exports.gzipSize = gzipSize;
