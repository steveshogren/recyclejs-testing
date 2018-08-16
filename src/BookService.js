import Rx from 'rxjs';
//import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';

export default function BookService(outputs) {
    let users = new Rx.BehaviorSubject(['1']);
    outputs.usersRequested
        .map(_ => Observable.from(fetch('https://jsonplaceholder.typicode.com/users')))
        .map(x=>
             {
                 debugger;
                 return x.response;})
        .subscribe(users);
    return ({ Users : users.asObservable() });
}
