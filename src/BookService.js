import Rx from 'rxjs';
const { ajax } = rxjs.ajax; // = require("rxjs/ajax")

export default function BookService(outputs) {
    let users = new Rx.BehaviorSubject(0);
    outputs.usersRequested
        .map(_ => ajax.('https://jsonplaceholder.typicode.com/users'))
        .map(x=>x.response)
        .subscribe(users);
    return ({ Users : users.asObservable() });
}
