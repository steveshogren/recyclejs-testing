import Rx from 'rxjs';
//import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs/Observable';
//import { ajax } from 'rxjs/observable/dom/ajax';


export default function BookService(outputs) {
    // "cold" observable
    let users = new Rx.BehaviorSubject([]);
    outputs.usersRequested
        .flatMap(_ => Observable.ajax('https://jsonplaceholder.typicode.com/users'))
        .map(x=> {return x.response;})
    // can pass a cold or hot observable to subscribe
    // and will pass along any new events into that observable
    // this lets us create a refernce to it before any come
    // down the pipe
        .subscribe(users);
    return ({ Users : users.asObservable() });
}
