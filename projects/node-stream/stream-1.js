const {Writable, Readable} = require("stream")

class MyWritableStream extends Writable {

    constructor(params) {
        super(params)
    }

}


const outStream = new Writable({
    write(chunk, encoding, callback) {
        console.log(chunk.toString())
        callback()
    }
})


process.stdin.pipe(outStream)

const inStream = new Readable({
    read(size) {
        this.push(String.fromCharCode(this.currentCharCode ++))
        if (this.currentCharCode > 91) {
            this.push(null)
        }
    }
})

inStream.on("data", chunk => {
    console.log(`Receive ${chunk.length} bytes of data`)
})



inStream.currentCharCode = 65

inStream.pipe(process.stdout)
