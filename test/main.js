var tryparse = require('../');
var should = require('should');
require('mocha');

describe('try-parse', function() {
  describe('parse() flat', function() {
    it('should work on positive hex numbers', function() {
      tryparse.parse("0x5f").should.equal(0x5f);
    });

    it('should work on positive numbers', function() {
      tryparse.parse("2").should.equal(2);
    });

    it('should work on positive floats', function() {
      tryparse.parse("2.1").should.equal(2.1);
    });

    it('should work on negative numbers', function() {
      tryparse.parse("-2").should.equal(-2);
    });

    it('should work on negative floats', function() {
      tryparse.parse("-2.1").should.equal(-2.1);
    });

    it('should work on NaN', function() {
      tryparse.parse("NaN").should.be.NaN;
    });

    it('should work on date strings', function() {
      var str = "Fri Sep 27 2013 18:10:00 GMT-0700 (MST)";
      var out = tryparse.parse(str);
      var expected = new Date(str);
      out.getTime().should.equal(expected.getTime());
    });

    it('should work on true booleans', function() {
      tryparse.parse("y").should.be.true;
      tryparse.parse("Y").should.be.true;
      tryparse.parse("yes").should.be.true;
      tryparse.parse("Yes").should.be.true;
      tryparse.parse("true").should.be.true;
      tryparse.parse("True").should.be.true;
    });

    it('should work on false booleans', function() {
      tryparse.parse("n").should.be.false;
      tryparse.parse("N").should.be.false;
      tryparse.parse("no").should.be.false;
      tryparse.parse("No").should.be.false;
      tryparse.parse("false").should.be.false;
      tryparse.parse("False").should.be.false;
    });

    it('should work on null strings', function() {
      (tryparse.parse("null") === null).should.be.true;
    })

    it('should work on undefined strings', function() {
      (tryparse.parse("undefined") === undefined).should.be.true;
    })

  });

  describe('parse() objects', function() {
    it('should work on a flat object', function() {
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
    });

    it('should work on a nested object', function() {
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
    });

  });


  describe('parse() JSON strings', function() {
    it('should work on a recursive JSON string', function() {
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
      var str = JSON.stringify(obj);
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

      tryparse.parse(str).should.eql(expected);
    });

  });
  
  describe('parse() arrays', function() {
    it('should work on a flat array', function() {
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
    });

    it('should work on a nested array', function() {
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
    });

  });

});
