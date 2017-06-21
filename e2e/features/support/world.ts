const { defineSupportCode } = require('cucumber');

function CustomWorld() {
  this.user = undefined;

  this.promiseSequencer = function() {
    return Array.prototype.slice.call(arguments).
      reduce((promise, promiseFunction) => promise.then(promiseFunction),
        Promise.resolve());
  }
}

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(CustomWorld);
});
