
Function.prototype.method = function (name, func) {
  'use strict';
  if (!this.prototype[name]){
    this.prototype[name] = func;
  }
};

module.exports = Function;
