import { any, compose, curry, flip, last, lt, prop, sortBy, tap } from 'ramda'

var CARS = [
  {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
  {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
  {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
  {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
  {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
  {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
];

describe('chp5', function () {
  it('case 1', function () {
    // lt 接受两个参数，判断第一个参数是否小于第二个参数
    // flip 返回函数前两个参数的驯熟
    // lt 等价于 (num1,num2) => num1 < num2
    // file(lt) 等价于 (num1, num2) => num2 < num1

    // 此时的 lessThan0 就等价与 (num) => 0 < num
    const lessThan0 = flip(lt)(0)
    const lessThan2 = flip(lt)(2)

    const any1 = any(lessThan0)([1, 2])
    const any2 = any(lessThan2)([1, 2])

    expect(any1).toBe(false)
    expect(any2).toBe(true)
  });

  // 彩蛋 2:
  // ============
  // 重构使之成为 pointfree 函数。提示：可以使用 _.flip()
  // var fastestCar = function(cars) {
  //   var sorted = _.sortBy(function(car){ return car.horsepower }, cars);
  //   var fastest = _.last(sorted);
  //   return fastest.name + ' is the fastest';
  // };
  it('彩蛋 2', () => {
    const fastestCar = (cars: typeof CARS) => {
      const sorted = sortBy((car) => car.horsepower, cars);
      const fastest = last(sorted)
      return fastest.name + ' is the fastest'
    }

    const concat = curry((str1: string, str2: string) => str1 + str2)

    const fastestCarA = compose(
      flip(concat)(' is the fastest'),
      prop("name"),
      last,
      sortBy(car => car.horsepower)
    )

    expect(fastestCarA(CARS)).toStrictEqual(fastestCarA(CARS))

  });


});
