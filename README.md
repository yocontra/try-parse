[![Build Status](https://travis-ci.org/wearefractal/try-parse.png?branch=master)](https://travis-ci.org/wearefractal/try-parse)

[![NPM version](https://badge.fury.io/js/try-parse.png)](http://badge.fury.io/js/try-parse)

## Information

<table>
<tr> 
<td>Package</td><td>try-parse</td>
</tr>
<tr>
<td>Description</td>
<td>Try to parse different data types from strings and objects of strings</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.4</td>
</tr>
</table>

## Usage

Works with numbers, ISO date strings, floats, and booleans (y, n, yes, no, false, and true). If you feel the need for another type to be parsed please open a pull request or issue as they are very easy to add.

This will recursively iterate objects and arrays and arrays of objects or whatever so make sure you don't have reference loops in the data.

```javascript
// parse a single value
var port = tryparse.parse("8080");
console.log(port); // 8080 (a number)

// recursively iterate a whole object
// and parse vals
var in = {
  port: "8080",
  host: "example.com",
  size: "-2.5",
  runAt: "Fri Sep 27 2013 18:10:00 GMT-0700 (MST)",
  doStuff: "Y",
  dontDoStuff: "n",
  please: "yes",
  thanks: "false",
  gracias: "no"
};

var out = tryparse.parse(in);
console.log(out);

/*
{
  port: 8080,
  host: "example.com",
  size: -2.5,
  runAt: Date(Fri Sep 27 2013 18:10:00 GMT-0700 (MST)),
  doStuff: true,
  dontDoStuff: false,
  please: true,
  thanks: false,
  gracias: false
}
*/

// replace process.env with a parsed one
process.env = tryparse.parse(process.env);

```

## LICENSE

(MIT License)

Copyright (c) 2013 Fractal <contact@wearefractal.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
