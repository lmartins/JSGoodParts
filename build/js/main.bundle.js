/*!
 * JSTests
 * 0.1.0:1401639441696 [development build]
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/ 		
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/ 		
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 		
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 		
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/ 	
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/js/";
/******/ 	
/******/ 	
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var fnUtils = __webpack_require__(1);
	
	
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
	
	var Mammal = function (name) {
	  this.name = name;
	};
	
	Mammal.prototype.getName = function () {
	  return this.name;
	};
	
	Mammal.prototype.says = function () {
	  return this.saying || '';
	};
	
	var myMammal = new Mammal('Herb the Mammal');
	var name = myMammal.getName();
	console.log(name);
	
	var Cat = function (name) {
	  this.name = name;
	  this.saying = 'meow';
	};
	
	// Replace cat proto with a new instance of Mammal
	Cat.prototype = new Mammal();
	
	
	// Augment the new prototype with
	// purr and get_name methods.
	Cat.prototype.purr = function (n) {
	  var i, s = '';
	  for (i = 0; i < n; i += 1) {
	    if (s){
	      s += '-';
	    }
	    s += 'r';
	  }
	  return s;
	};
	
	Cat.prototype.getName = function () {
	  return this.says() + ' ' + this.name + ' ' + this.says();
	};
	
	var myCat = new Cat('Henrietta');
	console.log( myCat.says() );
	console.log( myCat.purr(5) );
	console.log( myCat.getName() );


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	Function.prototype.method = function (name, func) {
	  'use strict';
	  if (!this.prototype[name]){
	    this.prototype[name] = func;
	  }
	};
	
	module.exports = Function;


/***/ }
/******/ ])
//# sourceMappingURL=main.bundle.js.map