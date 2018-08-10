import CounterService from './CounterService';
import Rx from 'rxjs';

it('says 0 from the beginning', done =>{
    let intents = { countRequested: new Rx.Subject()};
    let count = CounterService(intents).RunningCount.subscribe(x=>{
        expect(x).toBe(0);
        done();
    });
});

it('says 3 after three clicks', done =>{
    let intents = { countRequested: new Rx.Subject()};
    let count = CounterService(intents).RunningCount.skip(3).subscribe(x=>{
        expect(x).toBe(3);
        done();
    });
    intents.countRequested.next();
    intents.countRequested.next();
    intents.countRequested.next();
});