'use strict';
var MW, another_stooge, flight, key, stooge, value;

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

stooge = {
  firstName: "Jerome",
  lastName: 'Howard'
};

flight = {
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

flight.equipment = {
  model: 'Boeing 777'
};

flight.status = 'overdue';

console.log(flight);

stooge.nickname = 'Curly';

another_stooge = Object.create(stooge);

another_stooge.firstName = "Harry";

another_stooge.middleName = "Moses";

another_stooge.nickname = 'Moe';

stooge.profession = 'actor';

console.log(another_stooge);

console.log(flight.hasOwnProperty('number'));

for (key in another_stooge) {
  value = another_stooge[key];
  console.log("" + key + ": " + value);
}

delete another_stooge.nickname;

console.log(another_stooge.nickname);

/*
//# sourceMappingURL=ch3-objects.js.map
*/
