'use strict';

import React from 'react/addons';
import {Link} from 'react-router';


let Footer = React.createClass({
    render() {
        return (
          <div id="envuelve_pie" style={this.props.style}>
            <div className="footer">
              <div className="container-fluid">
                <div className="pull-right">
                  <Link to="/contacto">Contacto</Link>
                </div>
              </div>
            </div>
          </div>
        );
    }
});

module.exports = Footer;
