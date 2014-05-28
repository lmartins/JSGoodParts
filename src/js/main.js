'use strict';

var add = function (a,b) {
  return a + b;
};

var sum = add(3, 4);

var myObject = {
  value: 0,
  increment: function (inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  }
};

myObject.double = function() {
  var that = this;
  var helper = function() {
    that.value = add(that.value , that.value);
  };
  helper();
};

myObject.increment();
console.log(myObject.value);
myObject.increment(5);
myObject.increment(5);
console.log(myObject.value);
myObject.double();
console.log(myObject.value);
