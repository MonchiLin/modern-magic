import { IO, Maybe } from "./fp-container";
import { add, concat, curry, head, prop } from "ramda";
import { compose, map } from "./fp-primitives";

const join = (mma: Maybe) => mma.join()
const chain = curry((f, m) => {
  return m.map(f).join(); // 或者 compose(join, map(f))(m)
});

describe('chp9', function () {
  it('case 1', function () {
    const tetris = IO.of(() => "tetris")
    const io = tetris.map(concat(" Master"))
    console.log(Maybe.of(1336).map(add(1)))
  });

  it('case 0', function () {
    const s = `[{userId:10,phone:"18638247606",userName:"张三"},{userId:9,phone:"18638247605",userName:"张三"}]`

    const normalizeSignedBy = (str: string) => {
      str = str.slice(0, -1) + ",}"

      const object = {};

      let cursor = 0;

      const isComma = s => s === ','
      const isColon = s => s === ':'

      const nextColon = () => {
        return str.slice(cursor).split("").findIndex(isColon) + cursor
      }

      const nextComma = () => {
        return str.slice(cursor).split("").findIndex(isComma) + cursor
      }

      const safeParser = (s) => {
        if (s === "") {
          return s
        } else {
          try {
            return typeof s === "string" ? JSON.parse(s) : s
          } catch (e) {
            return ""
          }
        }
      }

      while (cursor <= str.length) {
        let curr = str[cursor];

        // 如果是 { 那么下一个一定是 对象名
        if (curr === "{") {
          while (curr != "}") {
            let colonIndex = nextColon()
            let key = str.slice(cursor + 1, colonIndex)
            cursor += 1
            let commaIndex = nextComma()
            let value = str.slice(colonIndex + 1, commaIndex)
            object[key] = safeParser(value)
            cursor = commaIndex
            curr = str[cursor]

            if (isComma(curr) && cursor + 2 >= str.length) {
              return object
            }
          }
        } else {
          console.log("无法解析的字符")
          cursor += 1
        }
      }
      return object
    };

    console.log(normalizeSignedBy(s))
  });

  it('case 2', function () {
    var readFile = function (filename) {
      return new IO(function () {
        return "假装是一个文件"
      });
    };

    //  print :: String -> IO String
    var print = function (x) {
      return new IO(function () {
        console.log(x);
        return x;
      });
    }

    const cat = compose(map(print), readFile)

    cat("./git").__value().__value()
  });

  it('case 3', function () {
    const safeProp = curry(function (x, obj) {
      return new Maybe(obj[x]);
    });
    const safeHead = safeProp(0);

    const firstAddressStreet = compose(
      join,
      map(safeProp("street")),
      join,
      map(safeHead),
      safeProp("addresses")
    )

    const addressStreet = firstAddressStreet(
      {
        addresses: [
          {street: {name: 'Mulburry', number: 8402}, postcode: "WC2N"}
        ]
      }
    )

    console.log(addressStreet)

  });

  it('case 4', function () {
    const log = (x) => IO.of(() => {
      console.log("log：", x)
      return x
    })

    const setStyle = curry((selector, props) => {
      return IO.of(() => {
        console.log("setStyle：假装设置 css，并且返回一个 jq 对象")
        return {}
      })
    })

    const getItem = (key) => {
      return IO.of(() => {
        console.log("getItem：假装读取，并且返回一个 jq 对象")
        return JSON.stringify({})
      })
    }

    const parse = (str) => {
      return JSON.parse(str())
    }

    const applyPreferences = compose(
      join,
      map(setStyle("#main")),
      join,
      map(log),
      map(parse),
      getItem,
    )

    applyPreferences("preferences").unsafePerformIO()

  });

});
