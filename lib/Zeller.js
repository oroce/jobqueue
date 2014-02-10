"use strict";

var genzen = require('genzen');

function Zeller() {
  this._middlewares = [];
}

Zeller.prototype.recieve = function recieve(data) {
  var middleware = this.middlewares();
  function next(cb) {
    var n = middleware.next();
    if(n.done) {
      cb();
    } else {
      run(n.value, cb);
    }
  }
  function run(middleware, cb) {
    genzen(function* (zen){
      yield* middleware(data, next, zen);
    }, cb);
  }
  var first = middleware.next();
  if(!first.done) {
    run(first.value);
  }
};

Zeller.prototype.middlewares = function* middlewares() {
  for(var i in this._middlewares) {
    yield this._middlewares[i];
  }
};

Zeller.prototype.use = function use(middleware) {
  this._middlewares.push(middleware);
  return this;
}

module.exports = Zeller;
