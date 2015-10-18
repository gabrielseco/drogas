'use strict';

import React from 'react/addons';
import FormLogin from '../Login/FormLogin';
import sessionStorage from '../../lib/sessionStorage';



var value = {
  usuario: null,
  password: null
};


let InterfaceLogin = React.createClass({
  cerrar(){
    sessionStorage.clear();
  },
    render() {


        return (
            <div>
              <FormLogin value={value} flux={this.props.flux} />
            </div>
        );
    }
});

module.exports = InterfaceLogin;
