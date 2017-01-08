'use strict';
const test = require('tape')
// var assert = require('assert');

const bytesize = require('../');

test('stringSize', (t) => {
  t.plan(1);
  const size = bytesize.stringSize('1 12 3 123 123');
  t.equal(size, 14);
});

test('pretty stringSize', (t) => {
  t.plan(1);
  const size = bytesize.stringSize('1 12 3 123 123', true);
  t.equal(size, '14 bytes');
});

test('fileSize', (t) => {
  t.plan(1);
  bytesize.fileSize(`${__dirname}/fixtures/test.txt`, (err, size) => {
    t.equal(size, 6696);
  });
});

test('pretty fileSize', (t) => {
  t.plan(1);
  bytesize.fileSize(`${__dirname}/fixtures/test.txt`, true, (err, size) => {
    t.equal(size, '6.54 Kb');
  });
});

test('gzipSize', (t) => {
  t.plan(1);
  bytesize.gzipSize(`${__dirname}/fixtures/test.txt`, (err, size) => {
    t.equal(size, 192);
  });
});

test('pretty gzipSize', (t) => {
  t.plan(1);
  bytesize.gzipSize(`${__dirname}/fixtures/test.txt`, true, (err, size) => {
    t.equal(size, '192 bytes');
  });
});
