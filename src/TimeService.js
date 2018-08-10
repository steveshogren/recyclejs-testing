import Rx from 'rxjs'

export default function TimeService(scheduler) {
    let secondsElapsed = new Rx.BehaviorSubject(0);
    Rx.Observable.interval(1000,scheduler).scan((x,_)=>x+1,0).subscribe(secondsElapsed);
    return ({ SecondsElapsed: secondsElapsed.asObservable() });
}