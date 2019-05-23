import {interval, Subject} from 'rxjs'
import {mapTo, multicast, take, tap} from "rxjs/operators";

const source = interval(2000)
    .pipe(take(5))


const example = source.pipe(
    tap(() => console.log("side effect #1")),
    mapTo("Result!")
)

const multi = example.pipe(multicast(() => new Subject()))

