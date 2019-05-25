import {ConnectableObservable, interval, Subject} from 'rxjs'
import {mapTo, multicast, take, tap} from "rxjs/operators";

const source = interval(2000)
    .pipe(take(5))


const example = source.pipe(
    tap(() => console.log("side effect #1")),
    mapTo("Result!")
)

const multi = example.pipe(multicast(() => new Subject()))

const subscriberOne = multi.subscribe(val => console.log(val));
const subscriberTwo = multi.subscribe(val => console.log(val));
// 使用 subject 订阅 source
// multi.connect();

