var TextOperation = require('../lib/text-operation');

function randomInt (n) {
  return Math.floor(Math.random() * n);
}

function randomString (n) {
  var str = '';
  while (n--) {
    var chr = randomInt(26) + 97;
    str = str + String.fromCharCode(chr);
  }
  return str;
}

function randomOperation (str) {
  var operation = new TextOperation();
  var left;
  while (true) {
    left = str.length - operation.baseLength;
    if (left === 0) { break; }
    var r = Math.random();
    var l = 1 + randomInt(Math.min(left, 20));
    if (r < 0.2) {
      operation.insert(randomString(l));
    } else if (r < 0.4) {
      operation['delete'](str.slice(operation.baseLength, operation.baseLength + l));
    } else {
      operation.retain(l);
    }
  }
  if (Math.random() < 0.3) {
    operation.insert(1 + randomString(10));
  }
  return operation;
}

function randomElement (arr) {
  return arr[randomInt(arr.length)];
}

// A random test generates random data to check some invariants. To increase
// confidence in a random test, it is run repeatedly.
function randomTest (n, fun) {
  return function (test) {
    while (n--) {
      fun(test);
    }
    test.done();
  };
}

exports.randomInt = randomInt;
exports.randomString = randomString;
exports.randomOperation = randomOperation;
exports.randomElement = randomElement;
exports.randomTest = randomTest;