'use strict';

import { Actions } from 'flummox';
import axios from 'axios';
import uuid from '../utils/uuid'
import localStorage from 'localStorage';

let serverFetchTodos = async function(apiendpoint) {
    let todos = await axios.get(apiendpoint + '/todos');
    return todos.data.slice(0, 7);  // passed to the store after REST response (obviously); sliced for the demo
};

export class PeticionesActions extends Actions {

    constructor(apiendpoint) {
        super();
        this.apiendpoint = apiendpoint;
    }


}
