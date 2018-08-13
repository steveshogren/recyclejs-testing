import Rx from 'rxjs'

export default function BookService(outputs) {
    let runningCount = new Rx.BehaviorSubject(0)
    outputs.countRequested.scan((x,_)=>x+1, 0).subscribe(runningCount)
    return ({ RunningCount : runningCount.asObservable() });
}
