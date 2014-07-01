var tryparse = require('../');
var should = require('should');
require('mocha');

describe('try-parse', function() {
  describe('parse() flat', function() {
    it('should work on positive hex numbers', function(done) {
      tryparse.parse("0x5f").should.equal(0x5f);
      done();
    });


    it('should work on positive numbers', function(done) {
      tryparse.parse("2").should.equal(2);
      done();
    });

    it('should work on positive floats', function(done) {
      tryparse.parse("2.1").should.equal(2.1);
      done();
    });

    it('should work on negative numbers', function(done) {
      tryparse.parse("-2").should.equal(-2);
      done();
    });

    it('should work on negative floats', function(done) {
      tryparse.parse("-2.1").should.equal(-2.1);
      done();
    });

    it('should work on date strings', function(done) {
      var str = "Fri Sep 27 2013 18:10:00 GMT-0700 (MST)";
      var out = tryparse.parse(str);
      var expected = new Date(str);
      out.getTime().should.equal(expected.getTime());
      done();
    });

    it('should work on true booleans', function(done) {
      tryparse.parse("y").should.equal(true);
      tryparse.parse("Y").should.equal(true);
      tryparse.parse("yes").should.equal(true);
      tryparse.parse("Yes").should.equal(true);
      tryparse.parse("true").should.equal(true);
      tryparse.parse("True").should.equal(true);
      done();
    });

    it('should work on false booleans', function(done) {
      tryparse.parse("n").should.equal(false);
      tryparse.parse("N").should.equal(false);
      tryparse.parse("no").should.equal(false);
      tryparse.parse("No").should.equal(false);
      tryparse.parse("false").should.equal(false);
      tryparse.parse("False").should.equal(false);
      done();
    });

  });

  describe('parse() recursive object', function() {
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

      tryparse.parse(obj).should.eql(expected);
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

      tryparse.parse(obj).should.eql(expected);
      done();
    });

  });
  
  describe('parse() recursive array', function() {
    it('should work on a flat array', function(done) {
      var obj = [{
        port: "8080",
        host: "example.com",
        size: "-2.5",
        runAt: "Fri Sep 27 2013 18:10:00 GMT-0700 (MST)",
        doStuff: "Y",
        dontDoStuff: "n",
        please: "yes",
        thanks: "false",
        gracias: "no"
      }];
      var expected = [{
        port: 8080,
        host: "example.com",
        size: -2.5,
        runAt: new Date(obj[0].runAt),
        doStuff: true,
        dontDoStuff: false,
        please: true,
        thanks: false,
        gracias: false
      }];

      tryparse.parse(obj).should.eql(expected);
      done();
    });

    it('should work on a recursive array', function(done) {
      var obj = [{
        port: "8080",
        host: "example.com",
        size: "-2.5",
        runAt: "Fri Sep 27 2013 18:10:00 GMT-0700 (MST)",
        doStuff: "Y",
        dontDoStuff: "n",
        please: "yes",
        thanks: "false",
        gracias: "no",
        nested: [{
          please: "yes",
          thanks: "false",
          gracias: "no"
        }]
      }];
      var expected = [{
        port: 8080,
        host: "example.com",
        size: -2.5,
        runAt: new Date(obj[0].runAt),
        doStuff: true,
        dontDoStuff: false,
        please: true,
        thanks: false,
        gracias: false,
        nested: [{
          please: true,
          thanks: false,
          gracias: false
        }]
      }];

      tryparse.parse(obj).should.eql(expected);
      done();
    });

  });

});
