'use strict';

var add = function (a, b) {
  if (typeof a !== 'number' || typeof b !== 'number'){
    throw{
      name: 'TypeError',
      message: 'add needs numbers'
    };
  }
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


var Quo = function(string) {
  this.status = string;
}
Quo.prototype.getStatus = function () {
  return this.status;
};

var myQuo = new Quo('confused');
console.log( myQuo.getStatus() );

var array = [3, 4];
var sum = add.apply(null, array);
console.log(sum);

var statusObject = {
  status: 'A-OK'
};

var status = Quo.prototype.getStatus.apply(statusObject);
console.log(status);

var sumFn = function () {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i]
  }
  return sum;
};

console.log( sumFn(4, 8, 15, 16, 23, 42 ));

var tryIt = function () {
  try{
    add("seven");
  } catch(e) {
    console.log(e.name +  ": " + e.message);
  }
};

tryIt();

Function.prototype.method = function (name, func) {
  if (!this.prototype[name]){
    this.prototype[name] = func;
  }
};

// Add a integer method to Number proptotype to extract the integer from a
// number
Number.method('integer', function() {
  return Math[this < 0 ? 'ceil' : 'floor'](this);
});

console.log( (-10/3).integer() );


// Add a method to String proto for extracting extra space from the end of strings
String.method('trim', function(){
  return this.replace(/^\s+|\s+$/g, '');
});

console.log('"' + "    neat    ".trim() + '"');
