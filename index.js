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
      if (typeof val === "string") {
        out[k] = tp.parseValue(val);
      } else if (typeof val === "object") {
        out[k] = tp.parseObject(val);
      } else {
        out[k] = val;
      }
    });
    return out;
  }
};