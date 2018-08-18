import Rx from 'rxjs';

function Intents(){
    let CountRequested = new Rx.Subject();
    let UsersRequested = new Rx.Subject();
    //clients usually want EITHER an observable or an observable, not both.
    return {
        inputs : { countRequested : new Rx.Subscriber(CountRequested),
                   usersRequested: new Rx.Subscriber(UsersRequested)},
        outputs : { countRequested : CountRequested.asObservable(),
                    usersRequested: UsersRequested.asObservable()}
    };
};


let intents = Intents();
export default intents;
