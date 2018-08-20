import React from 'react';
import recycle from 'recycle';
import { combineLatest } from 'rxjs/observable/combineLatest';
import intents from './Intents';
import BookService from './BookService';

// should be a singleton created at the top of the application
let timerConf = configureUser(BookService(intents.outputs));

let overwrite = (state,x) => x;
const combine1 = function(outputs, fn) {
            return [
                combineLatest(
                    outputs,
                    fn
                ).reducer(overwrite)];
}

export function configureUser(bookService) {

    return {
        update (sources) {
            return combine1 ([bookService.Users],
                              (us) => ({ Users: us }));
        },

        // produce a view given the current state
        view (props, state) {
            const users = state.Users.map((user) =>
                <div key={user.id}>{user.name}</div>
            );
            return (
            <div>
                { users }
            </div>
            )
        }
    };
}

export default recycle(timerConf);
