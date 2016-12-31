# bytesize

## Installation

`> npm install bytesize`.

Or use

`> npm install bytesize -g` to make the __bytesize__ executable available from your command line.

## From the Command Line:

  bytesize takes in a list of one or more files and prints their respective sizes:

`> bytesize file1.txt file2.txt file3.txt`

```
file1.txt:
  Uncompressed size: 1113
    Compressed size: 427
file2.txt:
  Uncompressed size: 605
    Compressed size: 326
file3.txt:
  Uncompressed size: 702
    Compressed size: 330
```

#### Options:
- _ --pretty, -p_, by default bytesize prints the number of bytes, pass this option to convert the byte count to a human-readable form:

`> bytesize file1.txt file2.txt file3.txt --pretty`

```
file1.txt:
  Uncompressed size: 11.09 Kb
    Compressed size: 427 bytes
file2.txt:
  Uncompressed size: 605 bytes
    Compressed size: 326 bytes
file3.txt:
  Uncompressed size: 702 bytes
    Compressed size: 330 bytes
```

- _ --compressedHide, -c_, pass this to hide the gzip-compressed size of the file:  

`> bytesize file1.txt file2.txt file3.txt -c -p`

```
file1.txt:
  Uncompressed size: 1.09 Kb
file2.txt:
  Uncompressed size: 605 bytes
file3.txt:
  Uncompressed size: 702 bytes

```
- _ --uncompressedHide, -u_, pass this to hide the raw uncompressed file size:  

`> bytesize file1.txt file2.txt file3.txt --pretty -u`

```
file1.txt:
    Compressed size: 427 bytes
file2.txt:
    Compressed size: 326 bytes
file3.txt:
    Compressed size: 330 bytes

```



## From code:

```
var bytesize = require('bytesize');

//string size
var size = bytesize.stringSize('1 12 3 123 123');
//size == 14

//string size
var size = bytesize.stringSize('1 12 3 123 123', true);
//size == 14B

//file size
bytesize.fileSize(__dirname + '/fixtures/test.txt', function(err, size) {
//size == 6660
});

//pretty file size
bytesize.fileSize(__dirname + '/fixtures/test.txt', true, function(err, size) {
//size == '6.50KB'
});

//gzip file size
bytesize.gzipSize(__dirname + '/fixtures/test.txt', function(err, size) {
//size == 190
});

//pretty gzip file size
bytesize.gzipSize(__dirname + '/fixtures/test.txt', true, function(err, size) {
//size == '190B'
});
```
