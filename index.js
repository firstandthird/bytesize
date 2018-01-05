const zlib = require('zlib');
const gzip = zlib.createGzip();
const fs = require('fs');
const prettyBytes = require('pretty-bytes');

const stringSize = (str, pretty) => {
  let bytes = Buffer.byteLength(str);
  return (pretty) ? prettyBytes(bytes) : bytes;
};

const fileSize = (file, pretty, gzip) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', function(err, file) {
      if (gzip) {
        zlib.gzip(file, function(err, buf) {
          if (err) {
            return reject(err);
          }
          bytes = buf.length;
          bytes = (pretty) ? prettyBytes(bytes) : bytes;
          resolve(bytes);
        });
      } else {
        resolve(stringSize(file, pretty));
      }
    });
  });
};
const gzipSize = async(file, pretty) => {
  return fileSize(file, pretty, true);
};

module.exports.stringSize = stringSize;
module.exports.fileSize = fileSize;
module.exports.gzipSize = gzipSize;
