import {Observable} from "rxjs";
import {publish, refCount} from "rxjs/operators";

const obs = new Observable(observer => observer.next(1))
    .pipe(
        publish(),
        refCount()
    )


obs.subscribe(v => console.log("1st subscriber: " + Date.now()));
obs.subscribe(v => console.log("2nd subscriber: " + Date.now()));


