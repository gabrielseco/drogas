'use strict';

import React from 'react/addons';
import FormLogin from '../Login/FormLogin';
import localStorage from 'localStorage';



var value = {
  usuario: null,
  password: null
};


let InterfaceLogin = React.createClass({
  cerrar(){
    localStorage.clear();
  },
  componentDidMount(){
      this.cerrar();
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
