import { Observable } from 'rxjs';
import { share } from "rxjs/operators";

const observable = new Observable(observer => {
  observer.next('Start');
  observer.next('Yeah');
  setInterval(() => {
    observer.next('I am alive')
  }, 1000)
}).pipe(share())

observable.subscribe((value) => console.log(`Subscriber1 ${value}`));

setTimeout(() => observable.subscribe((value) => console.log(`Subscriber2 ${value}`)), 2000)
