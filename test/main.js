var tryparse = require('../');
var should = require('should');
require('mocha');

describe('try-parse', function() {
  describe('parseValue()', function() {
    it('should work on positive hex numbers', function(done) {
      tryparse.parseValue("0x5f").should.equal(0x5f);
      done();
    });


    it('should work on positive numbers', function(done) {
      tryparse.parseValue("2").should.equal(2);
      done();
    });

    it('should work on positive floats', function(done) {
      tryparse.parseValue("2.1").should.equal(2.1);
      done();
    });

    it('should work on negative numbers', function(done) {
      tryparse.parseValue("-2").should.equal(-2);
      done();
    });

    it('should work on negative floats', function(done) {
      tryparse.parseValue("-2.1").should.equal(-2.1);
      done();
    });

    it('should work on date strings', function(done) {
      var str = "Fri Sep 27 2013 18:10:00 GMT-0700 (MST)";
      var out = tryparse.parseValue(str);
      var expected = new Date(str);
      out.getTime().should.equal(expected.getTime());
      String(out).should.equal(str);
      done();
    });

    it('should work on true booleans', function(done) {
      tryparse.parseValue("y").should.equal(true);
      tryparse.parseValue("Y").should.equal(true);
      tryparse.parseValue("yes").should.equal(true);
      tryparse.parseValue("Yes").should.equal(true);
      tryparse.parseValue("true").should.equal(true);
      tryparse.parseValue("True").should.equal(true);
      done();
    });

    it('should work on false booleans', function(done) {
      tryparse.parseValue("n").should.equal(false);
      tryparse.parseValue("N").should.equal(false);
      tryparse.parseValue("no").should.equal(false);
      tryparse.parseValue("No").should.equal(false);
      tryparse.parseValue("false").should.equal(false);
      tryparse.parseValue("False").should.equal(false);
      done();
    });

  });

  describe('parseObject()', function() {
    it('should work on a flat object', function(done) {
      var obj = {
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
      var expected = {
        port: 8080,
        host: "example.com",
        size: -2.5,
        runAt: new Date(obj.runAt),
        doStuff: true,
        dontDoStuff: false,
        please: true,
        thanks: false,
        gracias: false
      };

      tryparse.parseObject(obj).should.eql(expected);
      done();
    });

    it('should work on a recursive object', function(done) {
      var obj = {
        port: "8080",
        host: "example.com",
        size: "-2.5",
        runAt: "Fri Sep 27 2013 18:10:00 GMT-0700 (MST)",
        doStuff: "Y",
        dontDoStuff: "n",
        please: "yes",
        thanks: "false",
        gracias: "no",
        nested: {
          please: "yes",
          thanks: "false",
          gracias: "no"
        }
      };
      var expected = {
        port: 8080,
        host: "example.com",
        size: -2.5,
        runAt: new Date(obj.runAt),
        doStuff: true,
        dontDoStuff: false,
        please: true,
        thanks: false,
        gracias: false,
        nested: {
          please: true,
          thanks: false,
          gracias: false
        }
      };

      tryparse.parseObject(obj).should.eql(expected);
      done();
    });

  });

  describe('parseArray()', function() {
    it('should work on a flat array', function(done) {
      var arr = [
        "8080",
        "example.com",
        "-2.5",
        "Fri Sep 27 2013 18:10:00 GMT-0700 (MST)",
        "Y",
        "n",
        "yes",
        "false",
        "no"
      ];
      var expected = [
        8080,
        "example.com",
        -2.5,
        new Date(arr[3]),
        true,
        false,
        true,
        false,
        false
      ];

      tryparse.parseArray(arr).should.eql(expected);
      done();
    })

    it('should work on a nested array', function(done) {
      var arr = [
        "8080",
        "example.com",
        "-2.5",
        "Fri Sep 27 2013 18:10:00 GMT-0700 (MST)",
        "Y",
        "n",
        "yes",
        "false",
        "no",
        ["yes", "3.14", "hi"]
      ];
      var expected = [
        8080,
        "example.com",
        -2.5,
        new Date(arr[3]),
        true,
        false,
        true,
        false,
        false,
        [true, 3.14, "hi"]
      ];

      tryparse.parseArray(arr).should.eql(expected);
      done();
    })
  })

});
