'use strict';

var MYAPP = {};

MYAPP.stooge = {
  firstName: 'Jerome',
  lastName: 'Howard'
};
MYAPP.stooge.nickname = 'Curly';

MYAPP.flight = {
  airline: 'Oceanic',
  number: 815,
  status: 'Delayed',
  departure: {
    IATA: 'SYD',
    time: '2004-09-22 14:55',
    city: 'Sidney'
  },
  arrival: {
    IATA: 'LAX',
    time: '2004-09-23 10:42',
    city: 'Los Angeles'
  }
};


if (typeof Object.create !== 'function'){
  Object.create = function (obj) {
    var Fn = function () {};
    Fn.prototype = obj;
    return new Fn();
  }
};

MYAPP.anotherStooge = Object.create(MYAPP.stooge);
MYAPP.anotherStooge.firstName = "Harry";
MYAPP.anotherStooge.lastName = "Moses";
MYAPP.anotherStooge.nickname = 'Moe';
MYAPP.stooge.profession = 'actor';

//console.log( typeof flight.number );
//console.log( typeof flight.status );
//console.log( typeof flight.arrival );
//console.log( typeof flight.manifest );
//console.log( flight.hasOwnProperty('number') );
//console.log( flight.hasOwnProperty('constructor') );

var name;
for (name in MYAPP.anotherStooge){
  if ( MYAPP.anotherStooge.hasOwnProperty(name) ){
    console.log("Property " + name + " found with the value of " + MYAPP.anotherStooge[name]);
  }
}

var properties = [
  'firstName',
  'lastName',
  'middleName',
  'profession'
]

for (var i = 0; i < properties.length; i++) {
  console.log( properties[i] + ': ' + MYAPP.anotherStooge[properties[i]] );
}

delete MYAPP.anotherStooge.nickname;
console.log(MYAPP.anotherStooge.nickname);
