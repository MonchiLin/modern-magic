import {from, of} from 'rxjs'
import {map, merge, mergeAll, mergeMap, switchAll, switchMap, tap} from 'rxjs/operators'

const source = from([1, 2, 3, 4, 5])

source
    .pipe(
        mergeMap(v => of(v)),
    )
    .subscribe(console.log)


// of([1, 2, 3, 4, 5])
//     .pipe(tap(v => console.log("of tap", v)))
//     .subscribe(v => console.log("of", v))
// from([1, 2, 3, 4, 5])
//     .pipe(tap(v => console.log("from tap", v)))
//     .subscribe(v => console.log("from", v))