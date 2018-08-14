import React from 'react'
import recycle from 'recycle'
import { combineLatest } from 'rxjs/observable/combineLatest';
import Rx from 'rxjs'
import Intents from './Intents'
import CounterService from './CounterService'
import TimeService from './TimeService'
import BookService from './BookService'

// This is an integration point; configureTimer, CounterService, Intents, and
// TimeService are all separately testable. This is the module that knits them
// together.

let intents = Intents();
let timerConf = configureTimer(intents.inputs,
                               CounterService(intents.outputs),
                               BookService(intents.outputs),
                               TimeService(Rx.Scheduler.async));

export function configureTimer(inputs, counterService, bookService, timeService) {
    let overwrite = (state,x) => x;

    return {
        update (sources) {
            sources.selectId('countButton').addListener('onClick').subscribe(inputs.countRequested);
            sources.selectId('getUsers').addListener('onClick').subscribe(inputs.usersRequested);

            return [
                combineLatest(
                    counterService.RunningCount,
                    timeService.SecondsElapsed,
                    bookService.Users,
                    (c, s, us) => {
                        //debugger;
                        return ({ counter: c, secondsElapsed: s, users: us });
                    }
                ).reducer(overwrite)];
        },

        // produce a view given the current state
        view (props, state) {
            const users = state.users.map((user) =>
                <div key={user.id}>{user.name}</div>
            );
            return (
            <div>
                <div id="secs">Seconds Elapsed: {state.secondsElapsed}</div>
                <div id="clicks">Times Clicked: {state.counter}</div>
                <button id="countButton">Click Me</button>
                <button id="getUsers">Get users</button>
                { users }
            </div>
            )
        }
    };
}

export default recycle(timerConf)
