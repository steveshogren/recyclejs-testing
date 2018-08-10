import Rx from 'rxjs'

export default function CounterService(observableIntents) {
    let runningCount = new Rx.BehaviorSubject(0)
    observableIntents.countRequested.scan((x,_)=>x+1, 0).subscribe(runningCount)
    return ({ RunningCount : runningCount.asObservable() });
}