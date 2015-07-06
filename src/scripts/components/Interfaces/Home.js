'use strict';

import React from 'react/addons';
import FormLogin from '../Login/FormLogin';


var value = {
  usuario: null,
  password: null
};


let InterfaceHome = React.createClass({
    render() {


        return (
            <div>
              <FormLogin value={value} />
            </div>
        );
    }
});

module.exports = InterfaceHome;
