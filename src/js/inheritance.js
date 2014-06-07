'use strict';
var fnUtils = require('./utils/functionsProto');


Function.method('new', function () {
  // Create a new object that inherits from the
  // constructor's prototype.
  var that = Object.create(this.prototype);

  // Invoke the constructor, binding –this- to
  // the new object.
  var other = this.apply(that, arguments);

  // If its return value isn't an object,
  // substitute the new object.
  return (typeof other === 'object' && other) || that;
});

Function.method('inherits', function (Parent) {
  this.prototype = new Parent();
  return this;
});


Object.method('superior', function (name) {
  var that = this,
      method = that[name];
  return function() {
    return method.apply(that, arguments);
  };
});

//
// var Mammal = function (name) {
//   this.name = name;
// };
//
// Mammal.prototype.getName = function () {
//   return this.name;
// };
//
// Mammal.prototype.says = function () {
//   return this.saying || '';
// };
//
// var myMammal = new Mammal('Herb the Mammal');
// console.log( myMammal.getName() );
//
//
// var Cat = function (name) {
//   this.name = name;
//   this.saying = 'meow';
// };
//
// // Replace cat proto with a new instance of Mammal
// Cat.prototype = new Mammal();
//
//
// // Augment the new prototype with
// // purr and get_name methods.
// Cat.prototype.purr = function (n) {
//   var i, s = '';
//   for (i = 0; i < n; i += 1) {
//     if (s){
//       s += '-';
//     }
//     s += 'r';
//   }
//   return s;
// };
//
// Cat.prototype.getName = function () {
//   return this.says() + ' ' + this.name + ' ' + this.says();
// };
//
//
//
// var myCat = new Cat('Henrietta');
// console.log( myCat.says() );
// console.log( myCat.purr(5) );
// console.log( myCat.getName() );




// var myMammal = {
//   name: 'Herb the Mammal',
//   getName: function () {
//     return this.name;
//   },
//   says: function () {
//     return this.saying || '';
//   }
// };
//
// var myCat = Object.create(myMammal);
// myCat.name = 'Henrietta';
// myCat.saying = 'meow';
// myCat.purr = function (n) {
//   var i, s = '';
//   for (i = 0; i < n; i += 1) {
//     if (s) {
//       s += '-';
//     }
//     s += 'r';
//   }
//   return s;
// };
// myCat.getName = function () {
//   return this.says() + ' ' + this.name + ' ' + this.says();
// };
//
// console.log(myCat.purr(6));
// console.log( myCat.getName() );






var mammal = function (spec) {
  var that = {};
  that.getName = function () {
    return spec.name;
  };
  that.says = function () {
    return spec.saying || '';
  };
  return that;
};

var myMammal = mammal( {name: 'Herb'} );
var cat = function (spec) {
  spec.saying = spec.saying || 'meow';
  var that = mammal(spec);
  that.purr = function (n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
      if (s) {
        s += '-';
      }
      s += 'r';
    }
    return s;
  };
  that.getName = function () {
    return that.says() + ' ' + spec.name + ' ' + that.says();
  };
  return that;
};

var myCat = cat({name: 'Henrietta'});


var coolcat = function (spec) {
  var that = cat(spec),
      superGetName = that.superior('getName');

  that.getName = function (n) {
    return 'like ' + superGetName() + ' baby';
  };

  return that;
};

var myCoolCat = coolcat( {name: 'Bix'} );
console.log( myCoolCat.getName() );




var eventuality = function (that) {
  var registry = {};

  that.fire = function (event) {
    // Fire an event on an object. The event can be either
    // a string containing the name of the event or an
    // object containing a type property containing the
    // name of the event. Handlers registered by the 'on'
    // method that match the event name will be invoked.
    var array, func, handler, i,
        type = typeof event === 'string' ? event : event.type;
    // If an array of handlers exist for this event, then
    // loop through it and execute the handlers in order.
    if (registry.hasOwnProperty(type)) {
      array = registry[type];
      for (i = 0; i < array.length; i += 1) {
        handler = array[i];
        // A handler record contains a method and an optional
        // array of parameters. If the method is a name, look
        // up the function.
        func = handler.method;
        if (typeof func === 'string') {
          func = this[func];
        }

        // Invoke a handler. If the record contained
        // parameters, then pass them. Otherwise, pass the
        // event object.
        func.apply(this, handler.parameters || [event]);

      }
    }
    return this;
  };

  // Register an event. Make a handler record. Put it
  // in a handler array, making one if it doesn't yet
  // exist for this type.
  that.on = function (type, method, parameters) {
    var handler = {
      method: method,
      parameters: parameters
    };
    if (registry.hasOwnProperty(type)) {
      registry[type].push(handler);
    } else {
      registry[type] = [handler];
    }
    return this;
  };
  return that;
};

eventuality( myCoolCat );

var objectEventMethod = function( parameters ){
  console.log("I did something" );
};

myCoolCat.on('teste', objectEventMethod, {paramA: 'valorA'} );
myCoolCat.fire('teste');

console.log(myCoolCat);
