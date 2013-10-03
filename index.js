module.exports = tp = {
  table: {
    "y": true,
    "yes": true,
    "true": true,
    "n": false,
    "no": false,
    "false": false
  },
  parseValue: function(val) {
    // check replacement table
    var lowered = val.toLowerCase();
    if (typeof tp.table[lowered] !== "undefined") return tp.table[lowered];

    // check if its a number
    if (!isNaN(val)) return +val;

    // check if its a date
    var date = new Date(val);
    if (!isNaN(date)) return date;

    return val;
  },
  parseObject: function(obj) {
    var out = {};

    Object.keys(obj).forEach(function(k){
      var val = obj[k];
      out[k] = tp.parseAny(val);
    });
    return out;
  },
  parseArray: function(arr) {
    var out = [];

    var i, length;
    for(i = 0, length = arr.length; i < length; i++) {
      out.push(tp.parseAny(arr[i]));
    }
    return out;
  },
  parseAny: function(val) {
    var t = typeof val;
    if (t === "string") {
      return tp.parseValue(val);
    } else if (t === "object") {
      return tp.parseObject(val);
    } else if (t === "array") {
      return tp.parseArray(val);
    } else {
      return val;
    }
  }
};