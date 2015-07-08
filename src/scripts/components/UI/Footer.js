'use strict';

import React from 'react/addons';
import {Link} from 'react-router';


let Footer = React.createClass({
    render() {
        return (
            <div className="footer">
              <div className="pull-right">
                <Link to="/contacto">Contacto</Link>
              </div>
            </div>
        );
    }
});

module.exports = Footer;
