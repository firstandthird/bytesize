#bytesize

##Installation

`npm install bytesize`

## From the Command Line:

  bytesize takes in a list of one or more files and prints their respective sizes:

`> bytesize file1.txt file2.txt file3.txt`

```
file1.txt:
  file size: 1113
file2.txt:
  file size: 605
file3.txt:
  file size: 605
```

#### Options:
- _ --pretty, -p_, by default bytesize prints the number of bytes, pass this option to convert the byte count to a human-readable form:

`> bytesize file1.txt file2.txt file3.txt --pretty`

```
file1.txt:
  file size: 11.09 Kb
file2.txt:
  file size: 605 bytes
file3.txt:
  file size: 605 bytes
```

- _ --gzipsize, -g_, pass this option to print the gzip-compressed size of the file:  

`> bytesize file1.txt file2.txt file3.txt -g -p`

```
file1.txt:
  file size: 1.09 Kb
  gzip size: 427 bytes
file2.txt:
  file size: 605 bytes
  gzip size: 326 bytes
file3.txt:
  file size: 605 bytes
  gzip size: 326 bytes

```
- _ --filesize, -f_, by default bytesize prints the raw file size.  set this to 'false' to prevent bytesize from displaying it:

`> bytesize file1.txt file2.txt file3.txt -g --pretty -filesize false`

```
file1.txt:
  gzip size: 427 bytes
file2.txt:
  gzip size: 326 bytes
file3.txt:
  gzip size: 326 bytes

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
