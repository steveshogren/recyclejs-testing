import React from 'react'
import recycle from 'recycle'
import { combineLatest } from 'rxjs/observable/combineLatest';
import Rx from 'rxjs'
import Intents from './Intents'
import CounterService from './CounterService'
import TimeService from './TimeService'

// This is an integration point; configureTimer, CounterService, Intents, and
// TimeService are all separately testable. This is the module that knits them
// together.

let intents = Intents();
let timerConf = configureTimer(intents.inputs,
                               CounterService(intents.outputs),
                               TimeService(Rx.Scheduler.async));

export function configureTimer(inputs, counterService, timeService) {
    let overwrite = (state,x) => x;

    return {
        update (sources) {
            sources.select('button').addListener('onClick').subscribe(inputs.countRequested);

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

export default recycle(timerConf)
