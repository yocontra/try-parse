module.exports = tp = {
  table: {
    "y": true,
    "yes": true,
    "true": true,
    "n": false,
    "no": false,
    "false": false,
    "null": null,
    "undefined": undefined
  },
  parse: function(val) {

    // discard bad values
    if (val === null) return val;
    if (typeof val === "undefined") return val;

    // recurse arrays
    if (Array.isArray(val)) {
      var outArr = [];

      val.forEach(function(i, idx){
        outArr[idx] = tp.parse(i);
      });
      return outArr;
    }

    // recurse objects
    if (typeof val === "object") {
      var outObj = {};

      Object.keys(val).forEach(function(k){
        outObj[k] = tp.parse(val[k]);
      });
      return outObj;
    }

    // check replacement table
    var lowered = val.toLowerCase();
    if (lowered in tp.table) return tp.table[lowered];

    // check if it's a number
    if (!isNaN(val)) return +val;

    // check if it's NaN
    if (val === "NaN") return NaN;

    // check if it's a date
    var date = new Date(val);
    if (!isNaN(date)) return date;

    // check if it's JSON
    try { return tp.parse(JSON.parse(val)); }
    catch (e) { }

    return val;
  }
};