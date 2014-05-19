'use strict';
var MW, key, value, _ref;

Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
};

if (typeof Object.create !== 'function') {
  Object.create = function(obj) {
    var Func;
    Func = function() {};
    Func.prototype = obj;
    return new Func;
  };
}

MW = {};

MW.stooge = {
  firstName: "Jerome",
  lastName: 'Howard'
};

MW.flight = {
  airline: 'Oceanic',
  number: 815,
  departure: {
    IATA: "SYD",
    time: "2004-09-22 14:55",
    city: 'Sydney'
  },
  arrival: {
    IATA: "LAX",
    time: "2004-09-23 10:42",
    city: 'Los Angeles'
  }
};

MW.flight.equipment = {
  model: 'Boeing 777'
};

MW.flight.status = 'overdue';

console.log(MW.flight);

MW.stooge.nickname = 'Curly';

MW.another_stooge = Object.create(MW.stooge);

MW.another_stooge.firstName = "Harry";

MW.another_stooge.middleName = "Moses";

MW.another_stooge.nickname = 'Moe';

MW.stooge.profession = 'actor';

console.log(MW.another_stooge);

console.log(MW.flight.hasOwnProperty('number'));

_ref = MW.another_stooge;
for (key in _ref) {
  value = _ref[key];
  console.log("" + key + ": " + value);
}

delete MW.another_stooge.nickname;

console.log(MW.another_stooge.nickname);

/*
//# sourceMappingURL=ch3-objects.js.map
*/
