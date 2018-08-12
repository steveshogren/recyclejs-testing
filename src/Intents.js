import Rx from 'rxjs'

export default function Intents(){
    let CountRequested = new Rx.Subject();
    //clients usually want EITHER an observable or an observable, not both.
    return {
        observers : { countRequested : new Rx.Subscriber(CountRequested) },
        observables : { countRequested : CountRequested.asObservable() }
    };
};
