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

// Define a walk_the_DOM function that visits every
// node of the tree in HTML source order, starting
// from some given node. It invokes a function,
// passing it each node in turn. walk_the_DOM calls
// itself to process each of the child nodes.
var walkTheDom = function walk(node, func) {
  func(node, 'LI');
  node = node.firstChild;
  while (node) {
    walk(node, func);
    node = node.nextSibling;
  }
};

function toggleElementActive( el, nodeType ) {
  if (el.nodeName === nodeType ) {
    el.classList.toggle('active');
  }
}

var myList = document.querySelector('ul');
walkTheDom(myList, toggleElementActive );

// Define a getElementsByAttribute function. It
// takes an attribute name string and an optional
// matching value. It calls walk_the_DOM, passing it a
// function that looks for an attribute name in the
// node. The matching nodes are accumulated in a
// results array.

var getElementsByAttribute = function (att, value) {
  var results = [];
  walkTheDom(document.body, function(node){
    var actual = node.nodeType === 1 && node.getAttribute(att);
    if (typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
      results.push(node);
    }
  });
  return results;
};
getElementsByAttribute('data-role', 'navigation');


var foo = function () {
  var a = 3, b = 5;
  var bar = function () {
    var b = 7, c = 11;
    a += b + c;
  }
  console.log("Outer value of a is: " + a);
  console.log("Outer value of b is: " + b);
  bar();
  console.log("Outer value of a is: " + a);
  console.log("Outer value of b is: " + b);
}
foo();


var myObject = (function () {
  var value = 0;
  return {
    increment: function(inc) {
      value += typeof inc === 'number' ? inc : 1;
      console.log( "The new total is: " + this.getValue() );
    },
    getValue: function() {
      return value;
    }
  }
})();
myObject.increment(10);
myObject.increment(3);
// console.log(myObject.getValue());



// Create a maker function called quo. It makes an
// object with a get_status method and a private
// status property.

var quo = function (status) {
  return {
    getStatus: function() {
      return status;
    }
  }
}

var myQuo = quo('amazed');
console.log( myQuo.getStatus() );


// Define a function that sets a DOM node's color
// to yellow and then fades it to white.

var fade = function (node) {
  var level = 1;
  var step = function () {
    var hex = level.toString(16);
    node.style.backgroundColor = '#ffff' + hex + hex;
    if (level < 15) {
      level += 1;
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 100);
}

fade( document.querySelector('ul') );


var addEventHandlers = function(nodes) {
  for (var i = 0; i < nodes.length; i++) {
    console.log(nodes[i]);
    nodes[i].onclick = (function (i) {
      return function(e){
        console.log(e);
      }
    })(i);
  }
}

var listItems = document.querySelectorAll('li');
addEventHandlers(listItems);


String.method('deentityify', (function () {
  // The entity table. It maps entity names to
  // characters
  var entity = {
    quot: '"',
    lt: '<',
    gt: '>'
  };

  return function () {
    // This is the deentityify method. It calls the string
    // replace method, looking for substrings that start
    // with '&' and end with ';'. If the characters in
    // between are in the entity table, then replace the
    // entity with the character from the table. It uses
    // a regular expression (Chapter 7).
    return this.replace(/&([^&;]+);/g,
      function (a,b) {
        var r = entity[b];
        return typeof r === 'string' ? r : a;
      }
    );
  };
})());

console.log('&lt;&quot;&gt;'.deentityify());

var serialMaker = function () {
  // Produce an object that produces unique strings. A
  // unique string is made up of two parts: a prefix
  // and a sequence number. The object comes with
  // methods for setting the prefix and sequence
  var prefix = '',
      seq = 0;

  return {
    setPrefix: function (p) {
      prefix = String(p);
    },
    setSeq: function (s) {
      seq = s;
    },
    gensym: function () {
      var result = prefix + seq;
      seq += 1;
      return result;
    },
  }
};

var sequer = serialMaker();
sequer.setPrefix('Q');
sequer.setSeq(2000);
var unique = sequer.gensym();
console.log(unique);

// var fibonacci = (function (n) {
//   var memo = [0,1];
//   var fib = function (n) {
//     var result = memo[n];
//     if (typeof result !== 'number') {
//       result = fib(n - 1) + fib(n - 2);
//       memo[n] = result;
//     }
//     return result;
//   };
//
//   return fib;
// })();
//
// for (var i = 0; i < 10; i += 1) {
//   console.log('// ' + i + ': ' + fibonacci(i));
// }

var memoizer = function (memo, fundamental) {
  var shell = function (n) {
    var result = memo[n];
    if (typeof result !== 'number'){
      result = fundamental(shell, n);
      memo[n] = result;
    }
    return result;
  };
  return shell;
}

var fibonacci = memoizer([0, 1], function (shell, n) {
  return shell(n - 1) + shell(n - 2);
});

var factorial = memoizer([1,1], function (shell, n) {
  return n * shell(n - 1);
});
