/**
 * @function add, for safely adding numbers.
 *
 * @param  {...any} values
 * @returns {number} sum
 */
function add (...values) {
  return getValues(...values).reduce(function (augend, addend) {
    var { left, right, exponent } = expand(augend, addend)

    return (left + right) / exponent
  }, 0)
}

/**
 * @function minus, for safely subtracting numbers.
 *
 * @param  {...any} values
 * @returns {number} difference
 */
function minus (...values) {
  var numbers = getValues(...values)
  var first = numbers.shift()

  return numbers.reduce(function (minuend, subtrahend) {
    var { left, right, exponent } = expand(minuend, subtrahend)

    return (left - right) / exponent
  }, first)
}

/**
 * @function multiply, for safely multiplying numbers.
 *
 * @param  {...any} values
 * @returns {number} product
 */
function multiply (...values) {
  return getValues(...values).reduce(function (multiplicand, multiplier) {
    var { left, right, exponent } = expand(multiplicand, multiplier)

    return (left * right) / (exponent * exponent)
  }, 1)
}

/**
 * @function divide, for safely dividing numbers.
 *
 * @param  {...any} values
 * @returns {number} quotient
 */
function divide (...values) {
  var numbers = getValues(...values)
  var first = numbers.shift()

  return numbers.reduce(function (dividend, divisor) {
    var { left, right } = expand(dividend, divisor)

    // exponent not needed
    return left / right
  }, first)
}

/* Series functions */

/**
 * @function mean, for safely calculating the average of a series of numbers.
 *
 * @param  {...any} values
 * @returns {number}
 */
function mean (...values) {
  var size = 0

  var sum = getValues(...values).reduce(function (current, next) {
    // Expand only next value.
    var e = expand(next)

    /*
     * If next is a number, call add() and increment the set size, else just
     * return current sum.
     */

    return (
      +e.left === +e.left
        ? (size += 1, add(current, next))
        : current
    )
  }, size)

  return (
    size > 0
      ? sum / size
      : size
  )
}

/**
 * @function median, for safely calculating the middle value of a series of
 * numbers.
 *
 * @param  {...any} values
 * @returns {number}
 */
function median (...values) {
  var numbers = getValues(...values)

  if (!numbers.length) {
    return 0
  }

  // Need to sort our numbers first, then find the middle index.
  var sorted = ascending(numbers)

  var floor = Math.floor(sorted.length / 2)

  // Coerce Strings, Booleans, and functionally numeric values.
  return +(sorted[floor])
}

/**
 * @function mode, for safely calculating the highest occurring numbers in a
 * series.
 *
 * Note that function always returns an Array. If the incoming series is empty,
 * an empty Array is returned.
 *
 * @param  {...any} values
 * @returns {Array}
 */
function mode (...values) {
  var map = {}
  var most = 0
  var modes = []

  getValues(...values).forEach(value => {
    if (!isNumeric(value)) {
      return
    }

    value = +(value);

    // Increment value's count if value is mapped, or initialize it to 1.
    (value in map)
    && (map[value]++)
    || (map[value] = 1);

    // Reset most to new higher count
    (map[value] > most)
    && (most = map[value])
  })

  Object.keys(map).forEach(value => {

    /*
     * Push values whose count matches `most` to the modes array. The strict
     * equality test means never matching NaN.
     */

    (map[value] === most)
    && (modes.push(+(value)))
  })

  return modes
}

/**
 * @function range, for safely calculating the difference between the largest
 * and smallest values in a series. If there are less than two values in the
 * series, then 0 is returned.
 *
 * @param  {...any} values
 * @returns {number}
 */
function range (...values) {
  var low = Infinity
  var high = -Infinity

  var numbers = getValues(...values)

  if (numbers.length < 2) {
    return 0
  }

  numbers.forEach(value => {
    if (!isNumeric(value)) {
      return
    }

    value = +(value)

    value > high
    && (high = value)

    value < low
    && (low = value)
  })

  /*
   * Use add with positive and negative values to insure internal use of the
   * expand function.
   */

  return add(high, -low)
}

/* Conversion functions */

/**
 * @function percent returns 1/100th of a value.
 *
 * If the value is not functionally numeric or falsy (0), the value is
 * returned.
 *
 * @param {*}
 * @returns {number}
 */
function percent (value) {
  var number = Object(value).valueOf()

  if (!isNumeric(value) || !number) {
    return value
  }

  return divide(number, 100)
}

/**
 * @function power returns a value raised to the exponent, e.g., 2 to the power
 * of 3 returns 8.
 *
 * If either the value or the exponent is not functionally numeric, the value
 * is returned.
 *
 * If the exponent is not provided, it is assigned 1 by default, to mitigate
 * these cases with Math.pow():
 *
 *  Math.pow(9, undefined) => NaN
 *  Math.pow(9, null) => 1
 *  Math.pow(9, "") => 1
 *  Math.pow(9, "  ") => 1
 *
 * Function ultimately relies on multiply() to guard against impedance cases,
 * such as `Math.pow(1.1, 2) => 1.2100000000000002`.
 *
 * @param {{value: *, exponent: *}} param0
 * @returns {number}
 */
function power ({ value = undefined, exponent = 1 }) {
  if (!isNumeric(value) || !isNumeric(exponent)) {
    return value
  }

  var number = Object(value).valueOf()
  var power = Object(exponent).valueOf()
  var { '0': length, '1': fraction } = power.toString().split('.')

  if (fraction) {

    /*
     * 26 November 2020: Solving for fractional exponents.
     * If power contains a fraction, sign it the same as the integer length,
     * then use Math.pow on number to the fraction, and multiply that by number
     * to the integer length.
     */

    fraction = +('.' + fraction)

    if (power < 0) {
      fraction = fraction * -1
    }

    var left = Math.pow(number, fraction)
    var right = Math.pow(number, length)

    return multiply(left, right)
  } else {

    /*
     * 26 November 2020 continued: Otherwise, if the power is positive, fill a
     * series array of length equal to exponent power with the number and pass
     * that to multiply to proces the series. If power is negative, fill the
     * series with the reciprocal of the number, which is ironic as reciprocal
     * function delegates to the power function.
     */

    var abs = Math.abs(power)
    var field = power > 0
      ? number
      : 1 / number
    var series = Array(abs).fill(field)

    return multiply(series)
  }
}

/**
 * @function reciprocal returns the reciprocal of a value.
 *
 * If the value is not functionally numeric, the value is returned.
 *
 * @param {*}
 * @returns {number}
 */
function reciprocal (value) {
  return power({ value, exponent: -1 })
}

/**
 * @function square returns the square of a value.
 *
 * If the value is not functionally numeric, the value is returned.
 *
 * @param {*}
 * @returns {number}
 */
function square (value) {
  return power({ value, exponent: 2 })
}

/**
 * @function sqrt returns the square root of a value.
 *
 * If the value is numerically negative, an Error object is returned.
 *
 * If the value is not functionally numeric the value is returned.
 *
 * @param {*}
 * @returns {number}
 */
function sqrt (value) {
  if (value < 0) {
    return new Error('Invalid Input')
  }

  return power({ value, exponent: 0.5 })
}

/* Helper functions */

/**
 * @function getValues, extracts functionally numeric values in a series,
 * filtering out any non-numeric values, and returns numerically sorted array.
 *
 * @param  {...any} values
 * @returns {Array} numeric values
 */
function getValues (...values) {
  if (Array.isArray(values[0])) {
    values = values[0]
  }

  return values.filter(isNumeric)
}

/**
 * @function isNumeric, tests whether a given value is "functionally numeric,"
 * meaning Object(value).valueOf() returns a numeric value. Function removes
 * any formatting commas from string values before testing, and returns boolean
 * indicating the extracted value is not NaN, null, undefined, or an empty
 * string.
 *
 * @param {*} a
 * @returns {boolean}
 */
function isNumeric (a) {

  /*
   * If it's a string, remove commas and trim it.
   * Otherwise take the value.
   */

  var v = /^string/.test(typeof a)
    ? a.replace(/[,]/g, '').trim()
    : a

  /*
   * Test and return whether value is not NaN, null, undefined, or an empty
   * string,
   */

  var reInvalid = /^(NaN|null|undefined|)$/

  return !reInvalid.test(v)
}

/**
 * @function expand, accepts two parameters, coerces them to integers, and
 * returns an object containing the x & y integer pair, plus the exponent by
 * which to reduce the result of an operation on them to their original decimal
 * precision.
 *
 * Example: given 1.23 and 1.234, function returns an object with 3 integers:
 *
 *    left: 1230
 *    right: 1234
 *    exponent: 1000
 *
 * Originally part of gist at
 * https://gist.github.com/dfkaye/c2210ceb0f813dda498d22776f98d48a
 *
 * @param {*} x
 * @param {*} y
 * @returns {{ x: number, y: number, exponent: number }}
 */
function expand (x, y) {
  // Object(value).valueOf() trick for "functionally numeric" objects.

  x = Object(x).valueOf()
  y = Object(y).valueOf()

  // Format strings and convert into numbers.

  var reCommas = /[\,]/g

  if (typeof x == 'string') {
    x = +x.toString().replace(reCommas, '')
  }

  if (typeof y == 'string') {
    y = +y.toString().replace(reCommas, '')
  }

  // https://github.com/dfkaye/safe-math/issues/1
  // Special case: Given very small numbers, the runtime may convert the value
  // to scientific notation. For example, 0.0000000000186264514923095703125 is
  // converted to 1.862645149230957e-11. In that case we set left and right to
  // x and y respectively, and set d the exponent to 1, and return early.

  var sX = x.toString()
  var sY = y.toString()
  var mX = sX.split('.')[1] || ''
  var mY = sY.split('.')[1] || ''
  var dX = mX.split('e-')
  var dY = mY.split('e-')

  if (dX[1] || dY[1]) {
    return {
      left: x,
      right: y,
      exponent: 1
    }
  }

  // Main case: determine exponent based on largest mantissa length.

  var a = mX.length
  var b = mY.length
  var c = a > b ? a : b
  var d = Math.pow(10, c)

  /*
   * Expand x and y to integer values multiplying by exponent, converting
   * non-numeric values to their numeric equivalent, AND passing conversions to
   * the parseInt() function.
   *
   * Some examples:
   *  {} becomes NaN,
   *  true becomes 1,
   *  [4] becomes '4' which becomes 4,
   * and so on.
   *
   * Why parseInt()?
   *  Because, for example, .14 * 100 still produces 14.000000000000002.
   *
   * Why the self equality checks?
   *  Those are !NaN checks. parseInt(Infinity) returns NaN
   */

  var left = parseInt(x * d)
  var right = parseInt(y * d)

  return {
    left: left === left ? left : x * d,
    right: right === right ? right : y * d,
    exponent: d
  }
}

/**
 * @function ascending returns a copy of given values sorted in ascending
 * numeric order.
 *
 * @param  {...any} values
 * @returns {Array} sorted values
 */
function ascending (values) {
  return values.sort((a, b) => {
    if (a < b) {
      return -1
    }

    if (a > b) {
      return 1
    }

    return 0
  })
}

function ceilDecimals (value, decimals) {
  return Math.ceil(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

// 四舍五入小数
function roundDecimals (value, decimals) {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

export {
  // operations
  add, minus, multiply, divide,
  // series
  mean, median, mode, range,
  // conversions
  percent, power, reciprocal, square, sqrt,
  ceilDecimals, roundDecimals,
}
