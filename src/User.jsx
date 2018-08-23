import React from 'react';
import recycle from 'recycle';
import { Combiner } from './Combiner';
import intents from './Intents';
import BookService from './BookService';

// should be a singleton created at the top of the application
let timerConf = configureUser(BookService(intents.outputs));

export function configureUser(bookService) {

    return {
        update (sources) {
            return Combiner([[bookService, 'Users']]);
        },

        view (props, state) {
            return (
            <div>
                { state.Users.map((user) => <div key={user.id}>{user.name}</div>) }
            </div>
            )
        }
    };
}

export default recycle(timerConf);
