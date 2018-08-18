import React from 'react';
import recycle from 'recycle';
import { combineLatest } from 'rxjs/observable/combineLatest';
import Rx from 'rxjs';
import intents from './Intents';
import BookService from './BookService';

// should be a singleton created at the top of the application
let timerConf = configureUser(BookService(intents.outputs));

export function configureUser(bookService) {
    let overwrite = (state,x) => x;

    return {
        update (sources) {
            return [
                combineLatest(
                    bookService.Users,
                    (us) => {return ({ users: us });}
                ).reducer(overwrite)];
        },

        // produce a view given the current state
        view (props, state) {
            const users = state.users.map((user) =>
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
