module.exports = tp = {
  table: {
    "y": true,
    "yes": true,
    "true": true,
    "n": false,
    "no": false,
    "false": false
  },
  parse: function(val) {
    // discard shit values
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
    if (typeof tp.table[lowered] !== "undefined") return tp.table[lowered];

    // check if its a number
    if (!isNaN(val)) return +val;

    // check if its a date
    var date = new Date(val);
    if (!isNaN(date)) return date;

    return val;
  }
};