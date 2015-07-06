'use strict';

import React from 'react/addons';
import {Link, State} from 'react-router';

const cx = React.addons.classSet;

let UINavbar = React.createClass({
    mixins: [State],
    render() {

      var ruta = "/";
      var list = "";

        return (
          <div className="navbar yamm basic default">
              <div className="navbar-header">
                      <div className="basic-wrapper">
                          <a className="btn responsive-menu pull-right" data-toggle="collapse" data-target=".navbar-collapse">
                            <i></i>
                          </a>
                          <a className="navbar-brand" href={ruta}>
                              Plan de drogas
                          </a>
                      </div>
                </div>
                {list}
          </div>
        );
    }
});

module.exports = UINavbar;
