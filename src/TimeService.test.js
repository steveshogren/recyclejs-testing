import TimeService from './TimeService';
import Rx from 'rxjs';

it('says 0 from the beginning', done =>{
    let count = TimeService(Rx.Scheduler.async).SecondsElapsed.subscribe(x=>{
        expect(x).toBe(0);
        done();
    });
});

/* still trying to understand the marble testing api...
it('says 5 after five seconds', done => {
    let scheduler = new Rx.TestScheduler((a,e)=>expect(a).toBe(e));
    let sut = TimeService(scheduler).SecondsElapsed;
    let emitAfterFiveSecs = scheduler.createColdObservable('5s (1|)');

    emitAfterFiveSecs.withLatestFrom(sut).subscribe(x =>
        {
            expect(x[1]).toBe(5);
            return done();
        }
    );
    
    scheduler.flush();
});
*/