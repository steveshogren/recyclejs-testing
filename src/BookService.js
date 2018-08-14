import Rx from 'rxjs';
//import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs/Observable';
//import { ajax } from 'rxjs/observable/dom/ajax';


export default function BookService(outputs) {
    // "cold" observable
    let users = new Rx.BehaviorSubject([]);
    outputs.usersRequested
        .flatMap(_ => Observable.ajax('https://jsonplaceholder.typicode.com/users'))
        .map(x=> {
            // debugger;
            return x.response;})
        .subscribe(users
                  // {// debugger; users = x.response;}
                   );
    return ({ Users : users.asObservable() });
}
