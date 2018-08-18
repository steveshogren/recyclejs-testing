import React from 'react';
import recycle from 'recycle';
import { combineLatest } from 'rxjs/observable/combineLatest';
import Rx from 'rxjs';
import intents from './Intents';
import CounterService from './CounterService';
import User from './User';
import TimeService from './TimeService';

// should be a singleton created at the top of the application
let timerConf = configureTimer(intents.inputs,
                               CounterService(intents.outputs),
                               TimeService(Rx.Scheduler.async));

export function configureTimer(inputs, counterService, timeService) {
    let overwrite = (state,x) => x;

    return {
        update (sources) {
            sources.selectId('countButton').addListener('onClick').subscribe(inputs.countRequested);
            sources.selectId('getUsers').addListener('onClick').subscribe(inputs.usersRequested);

            return [
                combineLatest(
                    counterService.RunningCount,
                    timeService.SecondsElapsed,
                    (c, s) => ({ counter: c, secondsElapsed: s })
                ).reducer(overwrite)];
        },

        // produce a view given the current state
        view (props, state) {
            return (
            <div>
                <div id="secs">Seconds Elapsed: {state.secondsElapsed}</div>
                <div id="clicks">Times Clicked: {state.counter}</div>
                <button id="countButton">Click Me</button>
                <button id="getUsers">Get users</button>
                <User />
            </div>
            );
        }
    };
}

export default recycle(timerConf);
