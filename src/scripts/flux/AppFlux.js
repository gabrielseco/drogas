'use strict';

import { Flux } from 'flummox';
import Immutable from 'immutable';
import { LoginActions } from '../actions/LoginActions';



export class AppFlux extends Flux {

    constructor() {
        super();

        this.createActions('login', LoginActions, this.getApiendpoint());


         // The extra argument(s) are passed to the Action / Store constructors
    }

    getApiendpoint() { return "http://vlab.es/drogas/"; }


}
