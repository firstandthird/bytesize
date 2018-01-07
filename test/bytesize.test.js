const tap = require('tap');
const bytesize = require('../');

tap.test('stringSize', (t) => {
  const size = bytesize.stringSize('1 12 3 123 123');
  t.equal(size, 14);
  t.end();
});

tap.test('pretty stringSize', (t) => {
  const size = bytesize.stringSize('1 12 3 123 123', true);
  t.equal(size, '14 B');
  t.end();
});

tap.test('fileSize', async(t) => {
  const size = await bytesize.fileSize(`${__dirname}/fixtures/test.txt`);
  t.equal(size, 6660);
  t.end();
});

tap.test('pretty fileSize', async(t) => {
  const size = await bytesize.fileSize(`${__dirname}/fixtures/test.txt`, true);
  t.equal(size, '6.66 kB');
  t.end();
});

tap.test('gzipSize', async(t) => {
  const size = await bytesize.gzipSize(`${__dirname}/fixtures/test.txt`);
  t.equal(size, 190);
  t.end();
});

tap.test('pretty gzipSize', async(t) => {
  const size = await bytesize.gzipSize(`${__dirname}/fixtures/test.txt`, true);
  t.equal(size, '190 B');
  t.end();
});

tap.test('gzipstringsize', async(t) => {
  const size = await bytesize.gzipStringSize('1 12 3 123 123 123 35 12 1 12', false);
  t.equal(size, 35);
  const prettySize = await bytesize.gzipStringSize('1 12 3 123 123 123 35 12 1 12', true);
  t.equal(prettySize, '35 B');
  t.end();
});
