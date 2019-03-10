class Lexer {
    chunk = ""
    tokens

    constructor() {

    }

    lex(input) {
        this.chunk = input
        this.tokens = []
        while (!this.readEOF()) {
            // 消耗
            let consumed = this.readWhiteSpace()
                || this.readString()
                || this.readNumber()
                || this.readBoolean()
                || this.readNull()
                || this.readLiteral()
            this.chunk = this.chunk.slice(consumed)
        }
        return this.chunk
    }

    pushToken(type, value) {
        this.tokens.push([type, value])
    }

    readEOF() {
        if (!this.chunk) {
            this.pushToken("EOF", "")
            return true
        }
    }

    readWhiteSpace() {
        // 这段正则的意思是 匹配空白字符开头的所有空白字符 (空格, 制表符, 换页符)
        return this.chunk.match(/^\s*/)[0].length
    }

    readString() {
        let match = this.chunk.match(/^"(?:[^"\\\x00-\x1F\x7F\x80-\x9F]|\\["\\/bfnrt]|\\u[0-9a-fA-F]{4})*"/);
        if (match) {
            this.pushToken("String", match[0]);
            return match[0].length;
        }
    }

    readNumber() {
        let match = this.chunk.match(/^-?[1-9]*\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/);
        if (match) {
            this.pushToken("Number", match[0]);
            return match[0].length;
        }
    }

    readBoolean() {
        let match = this.chunk.match(/^(?:true|false)/);
        if (match) {
            this.pushToken("Boolean", match[0].toLowerCase());
            return match[0].length;
        }
    }

    readNull() {
        let match = this.chunk.match(/^null/);
        if (match) {
            this.pushToken("Null", match[0]);
            return match[0].length;
        }
    }

    readLiteral() {
        const value = this.chunk.charAt(0);
        this.pushToken(value, value);
        return value.length;
    }

}


const example = {
    "glossary": {
        "title": "example glossary",
        "GlossDiv": {
            "title": "S",
            "GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
                    "SortAs": "SGML",
                    "GlossTerm": "Standard Generalized Markup Language",
                    "Acronym": "SGML",
                    "Abbrev": "ISO 8879:1986",
                    "GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
                        "GlossSeeAlso": ["GML", "XML"]
                    },
                    "GlossSee": "markup"
                }
            }
        }
    }
}

const lexer = new Lexer()
const chunk = lexer.lex(JSON.stringify(example))
console.log(chunk)
