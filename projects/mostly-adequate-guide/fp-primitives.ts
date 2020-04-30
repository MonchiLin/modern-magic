const curry = (f, ...args) => {
  const wrap = (f, p) => {
    return function (...args) {
      var parameters = p.concat(Array.prototype.slice.call(args, 0));
      if (parameters.length == f.length) {
        return f.apply(this, parameters);
      }
      return wrap(f, parameters);
    }
  };
  return wrap(f, Array.prototype.slice.call(args, 1));
};

const compose = (...functions) => {
  return (result) => {
    for (let i = functions.length - 1; i >= 0; i--) {
      result = functions[i](result);
    }
    return result;
  };
};

const reduce = curry((f, start, arr) => {
  return arr.reduce(f, start);
});

const map = curry(function (f, arr) {
  return arr.map(f);
});

const filter = curry(function (f, arr) {
  return arr.filter(f);
});

const debug = function () {
  const parameters = Array.prototype.slice.call(arguments, 0);
  console.log("[Debug] Parameters: " + parameters.join(", "));
  return parameters;
};

const replace = curry(function (what, replacement, str) {
  return str.replace(what, replacement);
});

const join = curry(function (separator, arr) {
  return arr.join(separator);
});

const split = curry(function (separator, str) {
  return str.split(separator);
});

const reverse = reduce((acc, x) => {
  return [x].concat(acc)
}, []);

const head = function (x) {
  return x[0];
};

const last = compose(head, reverse);

const html = function (e) {
  return e.innerHTML;
};

const eq = curry(function (val, x) {
  console.log("EQ: ", val, x, val === x);
  return val === x;
});

const toLowerCase = function (x) {
  return x.toLowerCase();
};

const toUpperCase = function (x) {
  return x.toUpperCase();
};


export {
  curry,
  compose,
  reduce,
  map,
  filter,
  debug,
  replace,
  join,
  split,
  reverse,
  head,
  last,
  html,
  eq,
  toLowerCase,
  toUpperCase,
}
