'use strict';

import { Flux } from 'flummox';
import Immutable from 'immutable';


export class AppFlux extends Flux {

    constructor() {
        super();

         // The extra argument(s) are passed to the Action / Store constructors
    }

    getApiendpoint() { return ""; }


}
