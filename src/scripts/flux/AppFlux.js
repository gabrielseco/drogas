'use strict';

import { Flux } from 'flummox';
import Immutable from 'immutable';
import { LoginActions } from '../actions/LoginActions';
import { PeticionesActions } from '../actions/PeticionesActions';



export class AppFlux extends Flux {

    constructor() {
        super();
        this.createActions('login', LoginActions, this.getApiendpoint());
        this.createActions('peticiones', PeticionesActions, this.getApiendpoint());


         // The extra argument(s) are passed to the Action / Store constructors
    }

    getApiendpoint() {
      var url = "http://192.168.1.130:5412/drogas/";
      return url;
    }


}
