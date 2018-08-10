import React from 'react'
import recycle from 'recycle'
import { combineLatest } from 'rxjs/observable/combineLatest';

export function configureTimer(intentObservers, counterService, timeService) {
    let overwrite = (state,x) => x;

    return {
        update (sources) {
            sources.select('button').addListener('onClick').subscribe(intentObservers.countRequested);

            return [
                combineLatest(
                    counterService.RunningCount,
                    timeService.SecondsElapsed,
                    (c,s) => ({ counter : c, secondsElapsed : s })
                ).reducer(overwrite)];
        },

        // produce a view given the current state
        view (props, state) {
            return (
            <div>
                <div id="secs">Seconds Elapsed: {state.secondsElapsed}</div>
                <div id="clicks">Times Clicked: {state.counter}</div>
                <button>Click Me</button>
            </div>
            )
        }
    };
}