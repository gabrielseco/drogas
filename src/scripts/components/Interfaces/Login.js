'use strict';

import React from 'react/addons';
import FormLogin from '../Login/FormLogin';


var value = {
  usuario: null,
  password: null
};


let InterfaceLogin = React.createClass({
    render() {


        return (
            <div>
              <FormLogin value={value} flux={this.props.flux} />
            </div>
        );
    }
});

module.exports = InterfaceLogin;
